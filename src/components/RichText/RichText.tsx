import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type RichTextProps = {
    data: SerializedEditorState | null | undefined
}

export default function RichText({ data }: RichTextProps) {
    if (!data) {
        return null
    }

    return (
        <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-a:text-amber-700 prose-strong:text-slate-900">
            <PayloadRichText data={data} />
        </div>
    )
}