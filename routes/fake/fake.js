const express = require('express');
const router  = express.Router();

router.get("/", function (req, res, next) {
  let dataArray = [
    {
      data_nib: {
        id_nib: 1067,
        nib: "0220201110068",
        tgl_pengajuan_nib: "2020-01-06T00:00:00",
        tgl_terbit_nib: "2020-01-06T00:00:00",
        tgl_perubahan_nib: "0001-01-01T00:00:00 BC",
        oss_id: "P-202001061557531793951",
        id_izin: "I-202001061604345329493",
        kd_izin: "602000000001",
        kd_daerah: "000000",
        kewenangan: "00",
        jenis_pelaku_usaha: "11",
        no_npp: "0",
        no_va: "-",
        no_wlkp: "-",
        flag_perusahaan: "N",
        flag_ekspor: "N",
        flag_impor: "N",
        jenis_api: "-",
        gabung_negara: "N",
        negara_pma_dominan: "ID",
        total_pma: 0,
        nilai_pma_dominan: 0,
        nilai_pmdn: 51000000,
        persen_pma: 0,
        persen_pmdn: 100,
        kd_kawasan: "0",
        jenis_kawasan: "  ",
        versi_pia: "4.0.0",
        jangka_waktu: "0000-00-00",
        status_badan_hukum: "01",
        status_penanaman_modal: "02",
        npwp_perseroan: "938469350043000",
        nama_perseroan: "ERLINDO MITRA PERDANA",
        nama_singkatan: "-",
        jenis_perseroan: "01",
        status_perseroan: "N",
        alamat_perseroan:
          "Kirana Two Tower, level 10-A\r\nJl. Boulevard Timur No.88",
        rt_rw_perseroan: "005/002",
        kelurahan_perseroan: "-",
        perseroan_daerah_id: "3172061002",
        kode_pos_perseroan: "14250",
        nomor_telpon_perseroan: "081932957716",
        dalam_bentuk_uang: 51000000,
        dalam_bentuk_lain: "0",
        total_modal_dasar: 100000000,
        total_modal_ditempatkan: 51000000,
        no_pengesahan: "AHU-0068855.AH.01.01.Tahun 2019",
        tgl_pengesahan: "2019-12-26T00:00:00",
        no_akta_lama: "-",
        tgl_akta_lama: "2020-01-06T00:00:00",
        no_pengesahan_lama: "-",
        tgl_pengesahan_lama: "2020-01-06T00:00:00",
        jenis_id_user_proses: "01",
        no_id_user_proses: "3172061605750004",
        nama_user_proses: "ERINDITIO MEDIARDI KUSUMO",
        email_user_proses: "thomas.fajar@ilcs.co.id",
        hp_user_proses: "81311591125",
        alamat_user_proses: "JL.TAMAN AGAVE BLOK H6 NO.5",
        jns_kelamin_user_proses: "L",
        tempat_lahir_user_proses: "JAKARTA",
        tgl_lahir_user_proses: "1975-05-16T00:00:00",
        daerah_id_user_proses: "3275041004",
        rt_rw_user_proses: "006/014",
        agama_user_proses: "ISLAM",
        status_perkawinan_user_proses: "KAWIN",
        pekerjaan_user_proses: "KARYAWAN SWASTA",
        status_nib: "01",
        tipe_dokumen: "9",
        create_date: "2020-01-06T16:04:50.136997",
        update_date: null,
        flag_aktif: "Y",
        pemegang_saham: [
          {
            id_detail_pgsaham: 1880,
            id_nib: 1067,
            jenis_pemegang_saham: "01",
            flag_asing: "N",
            total_modal_pemegang: 15300000,
            jabatan_pemegang_saham: "DIREKTUR UTAMA",
            nama_pemegang_saham: "ERINDITIO MEDIARDI KUSUMO",
            jns_identitas_pemegang_saham: "01",
            no_identitas_pemegang_saham: "3172061605750004",
            valid_identitas_pemegang_saham: "0001-01-01T00:00:00 BC",
            pengendali_pemegang_saham: "-",
            npwp_pemegang_saham: "480012483043000",
            alamat_pemegang_saham: "Jalan Taman Agave Blok H6 no.5",
            fax_pemegang_saham: "-",
            email_pemegang_saham: "erinditio.kusumo@gmail.com",
            flag_pajak_pemegang_saham: "00",
            ket_pajak_pemegang_saham: "VALID",
            create_date: "2020-01-06T16:04:50.140863",
            update_date: null,
          },
          {
            id_detail_pgsaham: 1881,
            id_nib: 1067,
            jenis_pemegang_saham: "01",
            flag_asing: "N",
            total_modal_pemegang: 15300000,
            jabatan_pemegang_saham: "DIREKTUR",
            nama_pemegang_saham: "PUTRI RAMADHANTY",
            jns_identitas_pemegang_saham: "01",
            no_identitas_pemegang_saham: "3171056001981002",
            valid_identitas_pemegang_saham: "0001-01-01T00:00:00 BC",
            pengendali_pemegang_saham: "-",
            npwp_pemegang_saham: "936154707024000",
            alamat_pemegang_saham: "JL. Rawamangun no.24",
            fax_pemegang_saham: "-",
            email_pemegang_saham: "erinditio.kusumo@gmail.com",
            flag_pajak_pemegang_saham: "00",
            ket_pajak_pemegang_saham: "VALID",
            create_date: "2020-01-06T16:04:50.141779",
            update_date: null,
          },
          {
            id_detail_pgsaham: 1882,
            id_nib: 1067,
            jenis_pemegang_saham: "01",
            flag_asing: "N",
            total_modal_pemegang: 20400000,
            jabatan_pemegang_saham: "KOMISARIS",
            nama_pemegang_saham: "GITA SUTJAHJO",
            jns_identitas_pemegang_saham: "01",
            no_identitas_pemegang_saham: "3603170512810001",
            valid_identitas_pemegang_saham: "0001-01-01T00:00:00 BC",
            pengendali_pemegang_saham: "-",
            npwp_pemegang_saham: "794817361451000",
            alamat_pemegang_saham: "JL. Macan Kav. 4-5",
            fax_pemegang_saham: "-",
            email_pemegang_saham: "erinditio.kusumo@gmail.com",
            flag_pajak_pemegang_saham: "00",
            ket_pajak_pemegang_saham: "VALID",
            create_date: "2020-01-06T16:04:50.142378",
            update_date: null,
          },
        ],
        penanggung_jwb: [
          {
            id_detail_pgjawab: 1987,
            id_nib: 1067,
            flag_asing: "N",
            jns_identitas_penanggung_jwb: "01",
            no_identitas_penanggung_jwb: "3172061605750004",
            nama_penanggung_jwb: "ERINDITIO MEDIARDI KUSUMO",
            jabatan_penanggung_jwb: "DIREKTUR UTAMA",
            kebangsaan_penanggung_jwb: "01",
            negara_asal_penanggung_jwb: "-",
            npwp_penanggung_jwb: "480012483043000",
            alamat_penanggung_jwb: "Jalan Taman Agave Blok H6 no.5",
            jalan_penanggung_jwb: "-",
            blok_penanggung_jwb: "-",
            no_penanggung_jwb: "-",
            rt_rw_penanggung_jwb: "006/014",
            kelurahan_penanggung_jwb: "77446",
            daerah_id_penanggung_jwb: "32",
            kode_pos_penanggung_jwb: "-",
            no_telp_penanggung_jwb: "-",
            no_hp_penanggung_jwb: "081932957716",
            no_fax_penanggung_jwb: "-",
            email_penanggung_jwb: "erinditio.kusumo@gmail.com",
            flag_pajak_penanggung_jwb: "00",
            ket_pajak_penanggung_jwb: "VALID",
            create_date: "2020-01-06T16:04:50.143022",
            update_date: null,
          },
          {
            id_detail_pgjawab: 1988,
            id_nib: 1067,
            flag_asing: "N",
            jns_identitas_penanggung_jwb: "01",
            no_identitas_penanggung_jwb: "3171056001981002",
            nama_penanggung_jwb: "PUTRI RAMADHANTY",
            jabatan_penanggung_jwb: "DIREKTUR",
            kebangsaan_penanggung_jwb: "01",
            negara_asal_penanggung_jwb: "-",
            npwp_penanggung_jwb: "936154707024000",
            alamat_penanggung_jwb: "JL. Rawamangun no.24",
            jalan_penanggung_jwb: "-",
            blok_penanggung_jwb: "-",
            no_penanggung_jwb: "-",
            rt_rw_penanggung_jwb: "011/002",
            kelurahan_penanggung_jwb: "57181",
            daerah_id_penanggung_jwb: "31",
            kode_pos_penanggung_jwb: "-",
            no_telp_penanggung_jwb: "-",
            no_hp_penanggung_jwb: "081932957716",
            no_fax_penanggung_jwb: "-",
            email_penanggung_jwb: "erinditio.kusumo@gmail.com",
            flag_pajak_penanggung_jwb: "00",
            ket_pajak_penanggung_jwb: "VALID",
            create_date: "2020-01-06T16:04:50.143886",
            update_date: null,
          },
          {
            id_detail_pgjawab: 1989,
            id_nib: 1067,
            flag_asing: "N",
            jns_identitas_penanggung_jwb: "01",
            no_identitas_penanggung_jwb: "3603170512810001",
            nama_penanggung_jwb: "GITA SUTJAHJO",
            jabatan_penanggung_jwb: "KOMISARIS",
            kebangsaan_penanggung_jwb: "01",
            negara_asal_penanggung_jwb: "-",
            npwp_penanggung_jwb: "794817361451000",
            alamat_penanggung_jwb: "JL. Macan Kav. 4-5",
            jalan_penanggung_jwb: "-",
            blok_penanggung_jwb: "-",
            no_penanggung_jwb: "-",
            rt_rw_penanggung_jwb: "010/001",
            kelurahan_penanggung_jwb: "78005",
            daerah_id_penanggung_jwb: "31",
            kode_pos_penanggung_jwb: "-",
            no_telp_penanggung_jwb: "-",
            no_hp_penanggung_jwb: "081932957716",
            no_fax_penanggung_jwb: "-",
            email_penanggung_jwb: "erinditio.kusumo@gmail.com",
            flag_pajak_penanggung_jwb: "00",
            ket_pajak_penanggung_jwb: "VALID",
            create_date: "2020-01-06T16:04:50.144457",
            update_date: null,
          },
        ],
        legalitas: [
          {
            id_detail_legal: 1179,
            id_nib: 1067,
            jenis_legal: "01",
            no_legal: "13",
            tgl_legal: "2019-12-20T00:00:00",
            nama_notaris: "MUHAMMAD HERU MAHYUDIN, S.H., M.KN ",
            alamat_notaris: "KABUPATEN BOGOR",
            telepon_notaris: "-",
            create_date: "2020-01-06T16:04:50.144932",
            update_date: null,
          },
        ],
        data_rptka: [
          {
            id_detail_rptka: 757,
            id_nib: 1067,
            jenis_rptka: "-",
            no_rptka: "-",
            rptka_awal: null,
            rptka_akhir: null,
            rptka_gaji: 0,
            jumlah_tka_rptka: 0,
            jangka_penggunaan_waktu: "0001-01-01T00:00:00 BC",
            jangka_waktu_permohonan_rptka: 0,
            create_date: "2020-01-06T16:04:50.145698",
            update_date: null,
            rptka_jabatan: [
              {
                id_detail_rptkajab: 730,
                id_detail_rptka: 757,
                id_jabatan: "0",
                jabatan: "-",
                jumlah: 0,
                tgl_mulai: "0001-01-01T00:00:00 BC",
                tgl_selesai: "0001-01-01T00:00:00 BC",
                keterangan: "-",
                create_date: "2020-01-06T16:04:50.147061",
                update_date: null,
                rptka_tki_pendamping: [
                  {
                    id_detail_rptkajab_pp: 729,
                    id_detail_rptkajab: 730,
                    id_jabatan: "0",
                    id_pendamping: "0",
                    nama: "-",
                    nik: "-",
                    jabatan: "-",
                    hp: "-",
                    email: "-",
                    foto: "-",
                    pendidikan_min: "-",
                    sertifikat: "-",
                    pengalaman_kerja: 0,
                    keterangan: "-",
                    create_date: "2020-01-06T16:04:50.148136",
                    update_date: null,
                  },
                ],
              },
            ],
            rptka_negara: [
              {
                id_detail_rptkaneg: 729,
                id_detail_rptka: 757,
                id_negara: "-",
                jumlah: "0",
                create_date: "2020-01-06T16:04:50.148798",
                update_date: null,
              },
            ],
            rptka_lokasi: [
              {
                id_detail_rptkalok: 729,
                id_detail_rptka: 757,
                lokasi_id: "-",
                jumlah: "0",
                create_date: "2020-01-06T16:04:50.149359",
                update_date: null,
              },
            ],
          },
        ],
        data_proyek: [
          {
            id_detail_proyek: 987,
            id_nib: 1067,
            id_proyek: "-",
            uraian_usaha: "-",
            jumlah_tki_l: 0,
            jumlah_tki_p: 0,
            jumlah_tka_l: 0,
            jumlah_tka_p: 0,
            kbli: "-",
            sektor: "-",
            memiliki_menguasai: "-",
            jenis_lokasi: "-",
            status_tanah: "-",
            luas_tanah: 0,
            satuan_luas_tanah: "-",
            pembelian_pematang_tanah: 0,
            bangunan_gedung: 0,
            mesin_peralatan: 0,
            mesin_peralatan_usd: 0,
            investasi_lain: 0,
            sub_jumlah: 0,
            modal_kerja: 0,
            jumlah_investasi: 0,
            tanggal_kurs: null,
            nilai_kurs: 0,
            kd_kawasan: "-",
            jawab_lokasi_b: "-",
            jawab_lokasi_c: "-",
            jawab_lokasi_d: "-",
            jawab_lokasi_e: "-",
            jawab_lokasi_f: "-",
            jawab_lokasi_g: "-",
            flag_perluasan: "-",
            flag_cabang: "-",
            npwp_cabang: "-",
            nama_cabang: "-",
            jenis_identitas_pj: "-",
            no_identitas_pj: "-",
            nama_pj: "-",
            status_proyek: "-",
            create_date: "2020-01-06T16:04:50.150047",
            update_date: null,
            data_lokasi_proyek: [
              {
                id_detail_proyeklok: 1007,
                id_detail_proyek: 987,
                id_proyek_lokasi: "-",
                proyek_daerah_id: "-",
                kd_kawasan: "-",
                alamat_usaha: "-",
                id_kegiatan: "-",
                response_kegiatan: "-",
                jenis_kawasan: "-",
                jenis_lokasi: "-",
                status_lokasi: "-",
                create_date: "2020-01-06T16:04:50.15161",
                update_date: null,
                data_lokasi_proyek: [
                  {
                    id_detail_proyekloklokasi: 1005,
                    id_detail_proyeklok: 1007,
                    serial: 0,
                    lat_lng: "-",
                    create_date: "2020-01-06T16:04:50.152815",
                    update_date: null,
                  },
                ],
              },
            ],
            data_proyek_produk: [
              {
                id_detail_proyekproduk: 908,
                id_detail_proyek: 987,
                id_produk: "-",
                id_proyek: "-",
                kbli: "-",
                id_bidang_usaha: "-",
                jenis_produksi: "-",
                kapasitas: 0,
                satuan: "-",
                merk_dagang: "-",
                pemegang_haki: "-",
                pemegang_paten: "-",
                pi_nomor: "-",
                pi_tanggal: null,
                pi_npwp: "-",
                create_date: "2020-01-06T16:04:50.153463",
                update_date: null,
              },
            ],
          },
        ],
        data_dni: [
          {
            id_detail_dni: 659,
            id_nib: 1067,
            kd_dni: "-",
            create_date: "2020-01-06T16:04:50.154176",
            update_date: null,
          },
        ],
        data_checklist: [
          {
            id_detail_checklist: 864,
            id_nib: 1067,
            id_proyek: "-",
            id_izin: "I-202001061604345329493",
            kd_izin: "602000000001",
            kd_daerah: "000000",
            nama_izin: "Nomor Induk Kepabeanan",
            instansi: "Indonesia Nasional Single Window",
            id_bidang_spesifik: "-",
            bidang_spesifik: "-",
            id_kewenangan: "-",
            parameter_kewenangan: "-",
            kewenangan: "00",
            flag_checklist: "O",
            create_date: "2020-01-06T16:04:50.154838",
            update_date: null,
            data_persyaratan: [
              {
                id_detail_checklistsyarat: 863,
                id_detail_checklist: 864,
                id_syarat: "-",
                no_dokumen: "-",
                tgl_dokumen: null,
                file_dokumen: "-",
                keterangan: "-",
                create_date: "2020-01-06T16:04:50.155942",
                update_date: null,
              },
            ],
          },
        ],
      },
    },
  ];

  res.json({
    items: dataArray,
  });
});

module.exports = router;
