create or replace PROCEDURE f_max_no_pkk(
  P_KD_KAPAL IN MST_KAPAL.KD_KAPAL%TYPE,
  P_KD_CABANG IN MST_CABANG.KD_CABANG%TYPE,
  P_KD_AGEN IN MST_AGEN.KD_AGEN%TYPE,
  P_NO_UKK OUT PKK.NO_UKK%TYPE,
  P_ERRMSG OUT VARCHAR2)
IS
  --kd_kapal, kd_cabang, 6 digits counter

  V_OUT VARCHAR2(15);
  V_OUT1 NUMBER;
  v_errmsg VARCHAR2(100);

----      BugFix 2011-Sep-07 15:55 - Badra
----      Objek A akan mereplace objek B maupun C secara keseluruhan
----      A = "Length(p_kd_kapal)+Length(p_kd_cabang)+1"
----      B = "To_Number(SubStr(no_ukk, 7, 6))"
----      C = "To_Number(SubStr(no_ukk, 6, 6))"
----      KHUSUS untuk NO_UKK tidak menggunakan MST_COUNTER namun langsung akses ke table PKK

  CURSOR c_get_latest_ukk IS
--    SELECT SubStr(no_ukk, 1, 6)||LPad(To_Char(To_Number(SubStr(no_ukk, 7, Length(no_ukk)))+1), 6, '0') no_ukk
--    FROM (
      SELECT Max(no_ukk) no_ukk
      FROM pkk
      WHERE NO_UKK = P_KD_KAPAL||
                     P_KD_CABANG||
                                  LPad(Nvl(
                                              To_Number(SubStr(no_ukk,      Length(p_kd_kapal)+Length(p_kd_cabang)+1      , 6))
                                            ,
                                              0
                                          ),6, '0');


      --||P_KD_AGEN;
      --WHERE kd_kapal_agen = 'NJ18'||'01'||'824'
--    );
  d_get_latest_ukk c_get_latest_ukk%rowtype;

  --CURSOR c_compare_with_ppkb(xx_no_ukk VARCHAR2) IS
  CURSOR c_compare_with_ppkb IS
    SELECT Max(no_ukk) no_ukk FROM ppkb
    WHERE NO_UKK = P_KD_KAPAL||
                    P_KD_CABANG||
                                LPad(Nvl(
                                            To_Number(SubStr(no_ukk,      Length(p_kd_kapal)+Length(p_kd_cabang)+1      , 6))
                                          ,
                                            0
                                        ),6, '0');

    --WHERE SubStr(no_ukk, 1, 6) = 'NJ18'||'01'

    --    SELECT kd_ppkb
    --    FROM ppkb
    --    WHERE no_ukk = 'NJ1801000001';
  d_compare_with_ppkb c_compare_with_ppkb%rowtype;

  CURSOR c_migrasi_no_ukk is
    SELECT (URUTAN_COUNTER +1) URUTAN_COUNTER
    FROM MST_COUNTER
    WHERE KD_CABANG  = P_KD_CABANG
      AND KD_KAPAL   = P_KD_KAPAL
      --AND KD_AGEN    = P_KD_AGEN
      AND JN_COUNTER = '00';
  d_migrasi_no_ukk c_migrasi_no_ukk%ROWTYPE;

  CURSOR c_cek_lagi IS
    SELECT Max(no_ukk) no_ukk FROM pkk
    WHERE NO_UKK = P_KD_KAPAL||
                    P_KD_CABANG||
                                LPad(Nvl(
                                            To_Number(SubStr(no_ukk,      Length(p_kd_kapal)+Length(p_kd_cabang)+1      , 6))
                                          ,
                                            0
                                        ),6, '0');

  d_cek_lagi c_cek_lagi%ROWTYPE;

  CURSOR c_cek_lagi2(XXV_NO_UKK VARCHAR2) IS
    SELECT 1 HASIL FROM pkk WHERE no_ukk = XXV_NO_UKK AND KD_PKK_STATUS = '10';
  d_cek_lagi2 c_cek_lagi2%ROWTYPE;

  --untuk menentukan dia kegiatan umum/ offshore, menetap..
  --kalo umum baru cek ppkb,, tapi kalo offshore, menetap tidak perlu cek ke ppkb
  CURSOR c_kd_kegiatan(xx_no_ukk VARCHAR2) IS
    SELECT kd_kegiatan
    FROM pkk
    WHERE no_ukk = xx_no_ukk;
  d_kd_kegiatan c_kd_kegiatan%ROWTYPE;

  v_last_no_ukk      NUMBER := 0;
  v_last_no_ukk_ppkb NUMBER := 0;
  v_last_no_ukk_aneh NUMBER := 0;
BEGIN

  P_ERRMSG := '0';

  --cek apakah pkk sudah pernah dipake.. (pkk telah digunakan dalam ppkb)
  --jika belum pernah maka
  OPEN c_get_latest_ukk;
  FETCH c_get_latest_ukk INTO d_get_latest_ukk;
  CLOSE c_get_latest_ukk;

  --v_last_no_ukk := Nvl(To_Number(SubStr(d_get_latest_ukk.no_ukk, 7, 6))                                   , 0);
  v_last_no_ukk := Nvl(To_Number(SubStr(d_get_latest_ukk.no_ukk,      Length(p_kd_kapal)+Length(p_kd_cabang)+1      , 6))  , 0);

  Dbms_Output.put_line('v_last_no_ukk : '||v_last_no_ukk);

  IF d_get_latest_ukk.no_ukk IS NULL THEN
    --pkk belum pernah dibuat
    --maka ambil referensi dari mst_counter

    Dbms_Output.put_line('ENTER MIGRASI : '||d_migrasi_no_ukk.URUTAN_COUNTER);

    OPEN c_migrasi_no_ukk;
    FETCH c_migrasi_no_ukk INTO d_migrasi_no_ukk;
    CLOSE c_migrasi_no_ukk;

    v_last_no_ukk := Nvl(d_migrasi_no_ukk.URUTAN_COUNTER, v_last_no_ukk +1);

  ELSIF d_get_latest_ukk.no_ukk IS NOT NULL THEN
    --pkk pernah dibuat
    --maka

    OPEN c_kd_kegiatan(v_last_no_ukk);
    FETCH c_kd_kegiatan INTO d_kd_kegiatan;
    CLOSE c_kd_kegiatan;

    IF d_kd_kegiatan.kd_kegiatan = '1' THEN --umum

      OPEN c_compare_with_ppkb;
      FETCH c_compare_with_ppkb INTO d_compare_with_ppkb;
      CLOSE c_compare_with_ppkb;

      --v_last_no_ukk_ppkb := Nvl(To_Number(SubStr(d_compare_with_ppkb.no_ukk,    7                                              , 6)), 0);
      v_last_no_ukk_ppkb := Nvl(To_Number(SubStr(d_compare_with_ppkb.no_ukk,    Length(p_kd_kapal)+Length(p_kd_cabang)+1       , 6)), 0);

--      IF Length(d_compare_with_ppkb.no_ukk) = 12 THEN
--        v_last_no_ukk_ppkb := Nvl(To_Number(SubStr(d_compare_with_ppkb.no_ukk, 7, 6)), 0);
--      ELSIF Length(d_compare_with_ppkb.no_ukk) = 11 THEN
--        v_last_no_ukk_ppkb := Nvl(To_Number(SubStr(d_compare_with_ppkb.no_ukk, 6, 6)), 0);
--      END IF;

      --v_last_no_ukk_ppkb := Nvl(To_Number(SubStr(d_compare_with_ppkb.no_ukk, 7, 6)), 0);

      dbms_output.put_line ('d_compare_with_ppkb : '||Nvl(d_compare_with_ppkb.no_ukk,0));
      dbms_output.put_line ('d_get_latest_ukk : '||v_last_no_ukk);
      dbms_output.put_line ('v_last_no_ukk_ppkb : '||v_last_no_ukk_ppkb);


      --    SELECT kd_kapal FROM mst_kapal_agen
      --    (SELECT a.kd_kapal FROM mst_kapal a, mst_kapal_agen b
      --    WHERE a.kd_kapal = b.kd_kapal)
      --    MINUS
      --    SELECT DISTINCT SubStr(no_ukk, 1, 4) no_ukk FROM pkk

      IF (Nvl(v_last_no_ukk_ppkb,0) = 0) THEN
        --pada pkk telah ada no_ukk
        --namun pada ppkb belum pernah ada..
        --kasus aneh

        d_cek_lagi := NULL;
        OPEN c_cek_lagi;
        FETCH c_cek_lagi INTO d_cek_lagi;
        close c_cek_lagi;

        --Dbms_Output.put_line('v_last_no_ukk part1:'||v_last_no_ukk);

        IF d_cek_lagi.no_ukk IS NOT NULL THEN
          --v_last_no_ukk_aneh := Nvl(To_Number(SubStr(d_cek_lagi.no_ukk,   7                                               , 6)), 0);
          v_last_no_ukk_aneh := Nvl(To_Number(SubStr(d_cek_lagi.no_ukk,   Length(p_kd_kapal)+Length(p_kd_cabang)+1        , 6)), 0);

--          IF Length(d_cek_lagi.no_ukk) = 12 THEN
--            v_last_no_ukk_aneh := Nvl(To_Number(SubStr(d_cek_lagi.no_ukk, 7, 6)), 0);
--          ELSIF Length(d_cek_lagi.no_ukk) = 11 THEN
--            v_last_no_ukk_aneh := Nvl(To_Number(SubStr(d_cek_lagi.no_ukk, 6, 6)), 0);
--          END IF;

          IF v_last_no_ukk < v_last_no_ukk_aneh THEN
            v_last_no_ukk := v_last_no_ukk_aneh +1;
          ELSE
            v_last_no_ukk := v_last_no_ukk +1;
          END IF;

        END IF;

        --v_last_no_ukk := v_last_no_ukk +1;
        Dbms_Output.put_line('v_last_no_ukk part2:'||v_last_no_ukk);
        Dbms_Output.put_line('1 - kasus aneh');

      ELSIF (Nvl(v_last_no_ukk_ppkb,0) <> v_last_no_ukk) THEN
        --pkk yang terakhir tersebut belum pernah digunakan
        --siap digunakan kembali


        d_cek_lagi2 := NULL;
        open  c_cek_lagi2(d_get_latest_ukk.no_ukk);
        FETCH c_cek_lagi2 into d_cek_lagi2;
        CLOSE c_cek_lagi2;

        IF d_cek_lagi2.hasil IS NOT NULL THEN
          v_last_no_ukk := v_last_no_ukk +1;
          Dbms_Output.put_line('3 - maka bikin pkk baru');

        ELSE
          v_last_no_ukk := v_last_no_ukk;
          Dbms_Output.put_line('2 - siap digunakan kembali');

        END IF;




      ELSIF (Nvl(v_last_no_ukk_ppkb, 0) =  v_last_no_ukk) THEN
        --pkk yang terakhir tersebut pernah digunakan
        --maka bikin pkk baru

        v_last_no_ukk := v_last_no_ukk +1;
        Dbms_Output.put_line('3 - maka bikin pkk baru');
      END IF;
    ELSE --offshore dan menetap
      v_last_no_ukk := v_last_no_ukk +1;
    END IF; --end if kd_kegiatan umum
  END IF;

  V_OUT         := P_KD_KAPAL||P_KD_CABANG||LPad(v_last_no_ukk, 6, '0');

  BEGIN

    UPDATE MST_COUNTER
    SET URUTAN_COUNTER = v_last_no_ukk
    WHERE KD_CABANG    = P_KD_CABANG
      AND KD_KAPAL     = P_KD_KAPAL
      --AND KD_AGEN      = P_KD_AGEN
      AND JN_COUNTER   = '00';

  EXCEPTION WHEN OTHERS THEN

    INSERT INTO MST_COUNTER (
                    ID_COUNTER,
                    KD_CABANG,
                    KD_AGEN,
                    KD_KAPAL,
                    NAMA_COUNTER,
                    URUTAN_COUNTER,
                    STATUS,
                    JN_COUNTER)
    VALUES (SQ_MST_COUNTER.NEXTVAL,
            P_KD_CABANG,
            '-',
            P_KD_KAPAL,
            'Counter PKK',
            1,
            'Y',
            '00');

  END;

  COMMIT;

  P_NO_UKK := V_OUT;

----1234 56 7
----EQ13 17 000002

----123  45 6
----MPC  10 000019

----12   34 5
----SJ   11 000014

END;