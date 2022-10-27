const sampleData = {
  book: {
    bids: {
      20605: { price: 20605, count: 1, amount: 0.001875 },
      20606: { price: 20606, count: 1, amount: 0.00339707 },
      20608: { price: 20608, count: 2, amount: 2.4513817 },
      20609: { price: 20609, count: 1, amount: 0.005 },
      20610: { price: 20610, count: 2, amount: 0.425 },
      20612: { price: 20612, count: 1, amount: 0.00405973 },
      20613: { price: 20613, count: 1, amount: 1 },
      20614: { price: 20614, count: 1, amount: 26.13 },
      20616: { price: 20616, count: 1, amount: 0.01455276 },
      20617: { price: 20617, count: 1, amount: 0.03762285 },
      20620: { price: 20620, count: 1, amount: 0.15 },
      20623: { price: 20623, count: 1, amount: 0.1739235 },
      20624: { price: 20624, count: 2, amount: 0.11026938 },
      20625: { price: 20625, count: 1, amount: 0.036164 },
      20626: { price: 20626, count: 1, amount: 0.00387863 },
      20628: { price: 20628, count: 1, amount: 2.48026326 },
      20629: { price: 20629, count: 1, amount: 0.001875 },
      20631: { price: 20631, count: 1, amount: 0.01 },
      20633: { price: 20633, count: 1, amount: 0.03470516 },
      20634: { price: 20634, count: 3, amount: 16.59368982 },
      20640: { price: 20640, count: 1, amount: 0.002001 },
      20641: { price: 20641, count: 1, amount: 0.00390076 },
      20642: { price: 20642, count: 1, amount: 0.03324631 },
      20643: { price: 20643, count: 1, amount: 22.27 },
      20647: { price: 20647, count: 3, amount: 4.11160899 },
      20648: { price: 20648, count: 1, amount: 0.00124739 },
      20650: { price: 20650, count: 1, amount: 0.03178747 },
      20652: { price: 20652, count: 2, amount: 0.2000666 },
      20653: { price: 20653, count: 2, amount: 0.0019416 },
      20657: { price: 20657, count: 1, amount: 0.01465537 },
      20658: { price: 20658, count: 2, amount: 0.1054659 },
      20660: { price: 20660, count: 2, amount: 0.033203 },
      20661: { price: 20661, count: 1, amount: 0.01051 },
      20663: { price: 20663, count: 1, amount: 0.00387165 },
      20665: { price: 20665, count: 2, amount: 18.8155 },
      20666: { price: 20666, count: 4, amount: 5.54488993 },
      20670: { price: 20670, count: 2, amount: 0.0507 },
      20673: { price: 20673, count: 1, amount: 1.5702 },
      20675: { price: 20675, count: 3, amount: 11.82155813 },
      20676: { price: 20676, count: 2, amount: 1.47347982 },
      20677: { price: 20677, count: 1, amount: 6.9 },
      20678: { price: 20678, count: 2, amount: 0.00576878 },
      20681: { price: 20681, count: 4, amount: 6.512225 },
      20682: { price: 20682, count: 1, amount: 0.03210495 },
      20683: { price: 20683, count: 1, amount: 0.1 },
      20685: { price: 20685, count: 1, amount: 0.00013 },
      20686: { price: 20686, count: 2, amount: 20.02806073 },
      20687: { price: 20687, count: 1, amount: 3.00187654 },
      20688: { price: 20688, count: 1, amount: 0.00126 },
      20689: { price: 20689, count: 1, amount: 0.0033835 },
      20691: { price: 20691, count: 1, amount: 0.2 },
      20693: { price: 20693, count: 3, amount: 0.10419242 },
      20694: { price: 20694, count: 1, amount: 2.416146 },
      20695: { price: 20695, count: 1, amount: 0.06040233 },
      20696: { price: 20696, count: 1, amount: 1.13452206 },
      20700: { price: 20700, count: 4, amount: 0.25539468 },
      20702: { price: 20702, count: 6, amount: 1.40409946 },
      20704: { price: 20704, count: 1, amount: 1 },
      20705: { price: 20705, count: 2, amount: 1.06710881 },
      20706: { price: 20706, count: 2, amount: 1.24 },
      20707: { price: 20707, count: 4, amount: 3.22956609 },
      20710: { price: 20710, count: 4, amount: 11.07531855 },
      20711: { price: 20711, count: 1, amount: 0.00037865 },
      20712: { price: 20712, count: 2, amount: 0.80059563 },
      20713: { price: 20713, count: 2, amount: 0.08226175 },
      20714: { price: 20714, count: 1, amount: 0.11469 },
      20715: { price: 20715, count: 1, amount: 0.00388683 },
      20716: { price: 20716, count: 2, amount: 1.24352977 },
      20717: { price: 20717, count: 1, amount: 0.06339498 },
      20718: { price: 20718, count: 2, amount: 1.0159768 },
      20719: { price: 20719, count: 1, amount: 0.10069865 },
      20721: { price: 20721, count: 2, amount: 5.5732 },
      20722: { price: 20722, count: 2, amount: 3.43328721 },
      20723: { price: 20723, count: 1, amount: 0.0022 },
      20724: { price: 20724, count: 3, amount: 4.59602433 },
      20725: { price: 20725, count: 1, amount: 0.24972414 },
      20726: { price: 20726, count: 1, amount: 0.5997286 },
      20727: { price: 20727, count: 7, amount: 5.03340866 },
      20728: { price: 20728, count: 3, amount: 2.13977582 },
      20729: { price: 20729, count: 1, amount: 0.48571198 },
      20730: { price: 20730, count: 5, amount: 0.77890081 },
      20731: { price: 20731, count: 2, amount: 1.13063035 },
      20732: { price: 20732, count: 4, amount: 6.21744388 },
      20733: { price: 20733, count: 1, amount: 1 },
      20734: { price: 20734, count: 3, amount: 2.02908613 },
      20735: { price: 20735, count: 5, amount: 0.83221832 },
      20736: { price: 20736, count: 3, amount: 0.18889194 },
      20737: { price: 20737, count: 4, amount: 1.03075 },
      20738: { price: 20738, count: 4, amount: 0.66673738 },
      20739: { price: 20739, count: 6, amount: 2.8093984 },
      20740: { price: 20740, count: 2, amount: 0.26123482 },
      20741: { price: 20741, count: 5, amount: 1.55869864 },
      20742: { price: 20742, count: 3, amount: 0.648785 },
      20743: { price: 20743, count: 3, amount: 0.55272901 },
      20744: { price: 20744, count: 5, amount: 1.84808257 },
      20745: { price: 20745, count: 5, amount: 2.58303073 },
      20746: { price: 20746, count: 2, amount: 0.65743 },
      20747: { price: 20747, count: 3, amount: 1.00959541 }, //total usd 20946.07597127
      20748: { price: 20748, count: 2, amount: 0.82396506 }, //total usd 17095.627064880002
      20749: { price: 20749, count: 5, amount: 0.96691662 }, //total usd 20062.552948380002
    },
    asks: {
      20750: { price: 20750, count: 3, amount: 0.30567073 }, //total usd 6342.6676475
      20751: { price: 20751, count: 3, amount: 1.10629085 }, //total usd 22956.641428349998
      20753: { price: 20753, count: 1, amount: 0.4318647 }, //total usd 8962.4881191
      20754: { price: 20754, count: 3, amount: 1.27708548 },
      20755: { price: 20755, count: 5, amount: 3.9638303 },
      20756: { price: 20756, count: 6, amount: 0.489669 },
      20757: { price: 20757, count: 2, amount: 0.587 },
      20758: { price: 20758, count: 1, amount: 1.894 },
      20759: { price: 20759, count: 2, amount: 1.29971685 },
      20760: { price: 20760, count: 4, amount: 0.54450458 },
      20761: { price: 20761, count: 3, amount: 0.37320517 },
      20762: { price: 20762, count: 2, amount: 4.202 },
      20763: { price: 20763, count: 2, amount: 1.37864836 },
      20765: { price: 20765, count: 1, amount: 0.00980112 },
      20766: { price: 20766, count: 2, amount: 3.03656175 },
      20767: { price: 20767, count: 3, amount: 1.08623718 },
      20768: { price: 20768, count: 2, amount: 0.0717 },
      20769: { price: 20769, count: 2, amount: 1.002 },
      20771: { price: 20771, count: 1, amount: 0.00337 },
      20772: { price: 20772, count: 3, amount: 1.57000793 },
      20773: { price: 20773, count: 3, amount: 10.97513099 },
      20774: { price: 20774, count: 1, amount: 0.002 },
      20775: { price: 20775, count: 1, amount: 0.00385081 },
      20776: { price: 20776, count: 1, amount: 0.002 },
      20777: { price: 20777, count: 1, amount: 0.002 },
      20778: { price: 20778, count: 3, amount: 1.15589555 },
      20779: { price: 20779, count: 2, amount: 0.0717 },
      20780: { price: 20780, count: 1, amount: 0.002 },
      20781: { price: 20781, count: 3, amount: 0.43225783 },
      20783: { price: 20783, count: 2, amount: 0.1706398 },
      20784: { price: 20784, count: 1, amount: 9.26 },
      20785: { price: 20785, count: 2, amount: 0.964235 },
      20788: { price: 20788, count: 1, amount: 1.0547283 },
      20789: { price: 20789, count: 3, amount: 0.12215214 },
      20790: { price: 20790, count: 4, amount: 0.79840955 },
      20793: { price: 20793, count: 1, amount: 4.01145371 },
      20794: { price: 20794, count: 3, amount: 3.104556 },
      20796: { price: 20796, count: 1, amount: 1.16 },
      20797: { price: 20797, count: 1, amount: 1.13122769 },
      20799: { price: 20799, count: 1, amount: 0.000096 },
      20800: { price: 20800, count: 3, amount: 2.9047444 },
      20801: { price: 20801, count: 2, amount: 1.1142 },
      20806: { price: 20806, count: 1, amount: 4.806402 },
      20807: { price: 20807, count: 1, amount: 1.27245172 },
      20810: { price: 20810, count: 1, amount: 1.6234 },
      20811: { price: 20811, count: 1, amount: 1.10501634 },
      20812: { price: 20812, count: 2, amount: 1.14101295 },
      20813: { price: 20813, count: 2, amount: 18.71736326 },
      20815: { price: 20815, count: 1, amount: 0.05 },
      20817: { price: 20817, count: 2, amount: 1.4292578 },
      20818: { price: 20818, count: 1, amount: 0.1 },
      20823: { price: 20823, count: 2, amount: 3.29169 },
      20827: { price: 20827, count: 1, amount: 1.76770319 },
      20830: { price: 20830, count: 1, amount: 0.0003 },
      20831: { price: 20831, count: 3, amount: -13.16683527 },
      20834: { price: 20834, count: 1, amount: -0.006001 },
      20839: { price: 20839, count: 1, amount: -0.01 },
      20842: { price: 20842, count: 1, amount: 0.00042 },
      20843: { price: 20843, count: 1, amount: 1.59002001 },
      20844: { price: 20844, count: 1, amount: 18.831 },
      20846: { price: 20846, count: 3, amount: 24.541206 },
      20850: { price: 20850, count: 1, amount: 2.4123 },
      20860: { price: 20860, count: 1, amount: 37.68 },
      20862: { price: 20862, count: 1, amount: 0.0003 },
      20863: { price: 20863, count: 1, amount: 0.0003 },
      20864: { price: 20864, count: 1, amount: 0.0003 },
      20865: { price: 20865, count: 1, amount: 0.0003 },
      20866: { price: 20866, count: 2, amount: 2.47429315 },
      20869: { price: 20869, count: 2, amount: 0.20386892 },
      20872: { price: 20872, count: 1, amount: 8.74040172 },
      20888: { price: 20888, count: 1, amount: -0.00383004 },
      20889: { price: 20889, count: 1, amount: -0.01 },
      20890: { price: 20890, count: 1, amount: -2.9242 },
      20891: { price: 20891, count: 1, amount: -25.74 },
      20893: { price: 20893, count: 1, amount: 0.472686 },
      20895: { price: 20895, count: 1, amount: 2.82100991 },
      20897: { price: 20897, count: 1, amount: 0.00334981 },
      20898: { price: 20898, count: 1, amount: 32.8414 },
      20904: { price: 20904, count: 1, amount: 3.66 },
      20907: { price: 20907, count: 1, amount: 0.00386188 },
      20909: { price: 20909, count: 1, amount: 0.2 },
      20911: { price: 20911, count: 1, amount: 7.5 },
      20915: { price: 20915, count: 1, amount: 11.39373376 },
      20916: { price: 20916, count: 1, amount: 0.5 },
      20920: { price: 20920, count: 1, amount: 0.03192159 },
      20922: { price: 20922, count: 1, amount: -0.00077455 },
      20925: { price: 20925, count: 1, amount: 3.54526947 },
      20926: { price: 20926, count: 1, amount: 0.0005798 },
      20931: { price: 20931, count: 1, amount: -6.35154907 },
      20939: { price: 20939, count: 2, amount: -0.0103 },
      20940: { price: 20940, count: 1, amount: -0.0001 },
      20941: { price: 20941, count: 1, amount: -0.0003 },
      20943: { price: 20943, count: 2, amount: 0.00118403 },
      20944: { price: 20944, count: 3, amount: 0.00515503 },
      20945: { price: 20945, count: 1, amount: 3.5639 },
      20950: { price: 20950, count: 1, amount: 0.03181147 },
      20953: { price: 20953, count: 1, amount: 0.0005 },
      20955: { price: 20955, count: 1, amount: 0.00099 },
      20956: { price: 20956, count: 1, amount: 0.1588686 },
      20959: { price: 20959, count: 2, amount: 0.0053 },
    },
    snapshotValues: {
      bids: [
        '20749',
        '20748',
        '20747',
        '20746',
        '20745',
        '20744',
        '20743',
        '20742',
        '20741',
        '20740',
        '20739',
        '20738',
        '20737',
        '20736',
        '20735',
        '20734',
        '20733',
        '20732',
        '20731',
        '20730',
        '20729',
        '20728',
        '20727',
        '20726',
        '20725',
        '20724',
        '20723',
        '20722',
        '20721',
        '20719',
        '20718',
        '20717',
        '20716',
        '20715',
        '20714',
        '20713',
        '20712',
        '20711',
        '20710',
        '20707',
        '20706',
        '20705',
        '20704',
        '20702',
        '20700',
        '20696',
        '20695',
        '20694',
        '20693',
        '20691',
        '20689',
        '20688',
        '20687',
        '20686',
        '20685',
        '20683',
        '20682',
        '20681',
        '20678',
        '20677',
        '20676',
        '20675',
        '20673',
        '20670',
        '20666',
        '20665',
        '20663',
        '20661',
        '20660',
        '20658',
        '20657',
        '20653',
        '20652',
        '20650',
        '20648',
        '20647',
        '20643',
        '20642',
        '20641',
        '20640',
        '20634',
        '20633',
        '20631',
        '20629',
        '20628',
        '20626',
        '20625',
        '20624',
        '20623',
        '20620',
        '20617',
        '20616',
        '20614',
        '20613',
        '20612',
        '20610',
        '20609',
        '20608',
        '20606',
        '20605',
      ],
      asks: [
        '20750',
        '20751',
        '20753',
        '20754',
        '20755',
        '20756',
        '20757',
        '20758',
        '20759',
        '20760',
        '20761',
        '20762',
        '20763',
        '20765',
        '20766',
        '20767',
        '20768',
        '20769',
        '20771',
        '20772',
        '20773',
        '20774',
        '20775',
        '20776',
        '20777',
        '20778',
        '20779',
        '20780',
        '20781',
        '20783',
        '20784',
        '20785',
        '20788',
        '20789',
        '20790',
        '20793',
        '20794',
        '20796',
        '20797',
        '20799',
        '20800',
        '20801',
        '20806',
        '20807',
        '20810',
        '20811',
        '20812',
        '20813',
        '20815',
        '20817',
        '20818',
        '20823',
        '20827',
        '20830',
        '20831',
        '20834',
        '20839',
        '20842',
        '20843',
        '20844',
        '20846',
        '20850',
        '20860',
        '20862',
        '20863',
        '20864',
        '20865',
        '20866',
        '20869',
        '20872',
        '20888',
        '20889',
        '20890',
        '20891',
        '20893',
        '20895',
        '20897',
        '20898',
        '20904',
        '20907',
        '20909',
        '20911',
        '20915',
        '20916',
        '20920',
        '20922',
        '20925',
        '20926',
        '20931',
        '20939',
        '20940',
        '20941',
        '20943',
        '20944',
        '20945',
        '20950',
        '20953',
        '20955',
        '20956',
        '20959',
      ],
    },
    messageCounter: 8090,
    seq: 17340,
  },
};

export default sampleData;
