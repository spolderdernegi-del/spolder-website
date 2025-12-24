import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import erkekLogo from "@/assets/logo_erkek_tek.webp";
import disiLogo from "@/assets/logo_disi.webp";

const ColorSwatch = ({ name, className }: { name: string; className: string }) => (
  <div className="flex items-center gap-3">
    <div className={`h-10 w-10 rounded ${className}`} />
    <span className="text-sm text-muted-foreground">{name}</span>
  </div>
);

export default function CorporateIdentitySection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl md:text-4xl font-bold">Kurumsal Kimlik</h2>
        <p className="mt-2 text-muted-foreground">Logo kullanım kılavuzu, renk paleti ve tipografi.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Logo Önizleme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <img src={erkekLogo} alt="SPOLDER Logo Erkek" className="h-16 w-auto" />
              <img src={disiLogo} alt="SPOLDER Logo Dişi" className="h-16 w-auto" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <a href="/docs/spolder_logokullanimklavuzu.pdf" target="_blank" rel="noopener noreferrer">Logo Kullanım Kılavuzu (PDF)</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Renk Paleti</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <ColorSwatch name="Primary" className="bg-primary" />
            <ColorSwatch name="Foreground" className="bg-foreground" />
            <ColorSwatch name="Background" className="bg-background" />
            <ColorSwatch name="Anthracite" className="bg-anthracite" />
          </CardContent>
        </Card>
      </div>

      <Separator className="my-2" />

      <Card>
        <CardHeader>
          <CardTitle>Tipografi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-3xl font-bold">Başlık Örneği H1</div>
            <div className="text-xl font-semibold">Başlık Örneği H2</div>
            <div className="text-lg">Paragraf metni  kurumsal içerik örneği.</div>
            <div className="text-sm text-muted-foreground">Küçük metin ve açıklamalar.</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kullanım Notları</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <ul className="list-disc pl-6 space-y-2">
            <li>Logolar orantılı şekilde, arka plan kontrastına dikkat edilerek kullanılmalıdır.</li>
            <li>Minimum boşluk ve yanlış kullanım örnekleri PDFde belirtilmiştir.</li>
            <li>Renkler Tailwind tema değişkenleri ile tanımlıdır: primary, foreground, background vb.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
