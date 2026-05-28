import { Clock, UtensilsCrossed, HandHeart, Users, Shirt, Leaf } from 'lucide-react';

const adabList = [
  {
    icon: Clock,
    title: 'Memperhatikan Waktu Sholat',
    desc: 'Jangan sampai keseruan walimah melalaikan kewajiban sholat tepat waktu.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Adab Makan & Minum',
    desc: 'Mulailah dengan bismillah, gunakan tangan kanan, dan makan secukupnya.',
  },
  {
    icon: HandHeart,
    title: 'Mendoakan Kedua Mempelai',
    desc: 'Ucapkan doa tulus: "Baarakallahu laka wa baaraka alaika wa jama\'a bainakuma fi khair."',
  },
  {
    icon: Users,
    title: 'Adab Terhadap Lawan Jenis',
    desc: 'Jaga pandangan, hindari ikhtilat, dan jaga batasan pergaulan yang islami.',
  },
  {
    icon: Shirt,
    title: 'Berpakaian Sopan & Syar\'i',
    desc: 'Kenakan pakaian yang menutup aurat dan layak untuk menghadiri walimah.',
  },
  {
    icon: Leaf,
    title: 'Tidak Mubadzir',
    desc: 'Ambil makanan secukupnya dan hindari pemborosan dalam segala hal.',
  },
];

interface AdabWalimahProps {
  theme?: 'dark' | 'light';
  accentColor?: string;
}

export default function AdabWalimah({ theme = 'light', accentColor = '#f43f5e' }: AdabWalimahProps) {
  const isDark = theme === 'dark';

  return (
    <section
      className="py-16 px-6"
      style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#fafaf9' }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: accentColor, opacity: 0.7 }}>
            Tata Krama
          </p>
          <h2
            className="text-3xl font-bold"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: isDark ? '#fff' : '#1c1917' }}
          >
            Adab Walimah
          </h2>
          <div className="w-16 h-0.5 mx-auto mt-3" style={{ background: accentColor, opacity: 0.4 }} />
          <p className="text-sm mt-4 max-w-sm mx-auto" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#78716c' }}>
            Semoga kehadiran Anda membawa keberkahan bagi kedua mempelai dan seluruh tamu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {adabList.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 rounded-2xl border"
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#e7e5e4',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${accentColor}20` }}
              >
                <Icon className="h-5 w-5" style={{ color: accentColor }} />
              </div>
              <div>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: isDark ? '#fff' : '#1c1917' }}
                >
                  {title}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: isDark ? 'rgba(255,255,255,0.45)' : '#78716c' }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
