import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

/** Ham HTML devre dışı (react-markdown varsayılanı): XSS güvenli. */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[[rehypeHighlight, { detect: true }]]}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
