interface Props {
    description: string;
}

const ENTITIES: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&nbsp;": " ",
};

const toPlainText = (html: string) =>
    html
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]*>/g, "")
        .replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (entity) => ENTITIES[entity] ?? entity);

export default function DescriptionSection({ description }: Props) {
    return (
        <section className="bg-bg-secondary border border-border-default rounded-xl p-4 my-2">
            <div className="text-text-primary leading-relaxed whitespace-pre-line">
                {toPlainText(description)}
            </div>
        </section>
    );
}
