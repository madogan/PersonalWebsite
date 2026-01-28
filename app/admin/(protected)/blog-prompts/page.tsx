import { getGeminiPrompts } from '@/lib/gemini-prompts'
import { GeminiPromptsForm } from '@/components/admin/gemini-prompts-form'

export default function AdminBlogPromptsPage() {
  const prompts = getGeminiPrompts()
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Blog prompts (Gemini)</h1>
      <p className="mb-6 text-sm text-foreground/70">
        Bu promptlar, admin panelde &quot;Generate with Gemini&quot; ile blog taslağı üretirken
        kullanılır. {{topic}} kullanıcının girdiği konu, {{context}} ise (varsa) diğer dildeki
        içerik için kullanılır.
      </p>
      <GeminiPromptsForm initialPrompts={prompts} />
    </div>
  )
}
