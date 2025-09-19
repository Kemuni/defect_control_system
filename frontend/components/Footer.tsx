import {Typography} from "@/components/icons/Typography";

function Footer() {
  return (
    <footer className="w-full flex justify-between items-center bg-light-background text-black px-16 py-4">
      <Typography variant="text" weight="medium">&copy; 2025 &quot;Система Контроля&quot;<br/> Все права защищены.</Typography>
      <section className="flex flex-col gap-2">
        <Typography variant="text" weight="medium">Наши соцсети</Typography>
        <article className="flex gap-2">
          <Typography variant="text" className="underline">Telegram</Typography>
          <Typography variant="text" className="underline">VK</Typography>
        </article>
      </section>
      <section className="flex flex-col gap-2">
        <Typography variant="text" weight="medium">Нашли ошибку?</Typography>
        <Typography variant="text" className="underline">Сообщить об ошибке</Typography>
      </section>
      <section className="flex flex-col gap-2">
        <Typography variant="text" className="underline">Наши партнеры</Typography>
        <Typography variant="text" className="underline">Стать партнером</Typography>
      </section>
      <section className="flex flex-col items-end gap-2">
        <Typography variant="text">Наша почта: <span className="underline">test@test.com</span></Typography>
        <Typography variant="text">Телефон: <span className="underline">+7 (999) 999-99-99</span></Typography>
      </section>
    </footer>
  );
}

export default Footer;
