interface Props {
    description: string;
}

export default function DescriptionSection({ description }: Props) {
    return (
        <section className="bg-bg-secondary border border-border-default rounded-xl p-4 my-2">
            <div className="text-text-primary leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
        </section>
    );
}
