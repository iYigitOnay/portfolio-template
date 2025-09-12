"use client";

export function ContactForm() {
  return (
    <form
      className="space-y-4 max-w-lg"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
          }),
        });
        if (res.ok) {
          alert("Mesaj gönderildi ✅");
          form.reset();
        } else {
          alert("Hata oluştu ❌");
        }
      }}
    >
      <div>
        <label className="block text-sm font-medium">Ad Soyad</label>
        <input
          type="text"
          name="name"
          required
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          required
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Mesaj</label>
        <textarea
          name="message"
          rows={4}
          required
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:opacity-90"
      >
        Gönder
      </button>
    </form>
  );
}
