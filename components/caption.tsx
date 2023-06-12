import Link from "next/link";

const renderCaptionWithTags = (caption: string) => {
  const words = caption.split(' ');

  return words.map((word, index) => {
    if (word.startsWith('@')) {
      const username = word.substring(1);
      const url = `https://www.instagram.com/${username}/`;

      return (
        <Link
          className="text-blue-500 hover:underline"
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {word}
        </Link>
      );
    }

    return word + ' ';
  });
};

interface Props {
  caption: string;
  overflow: "elipsis" | "none";
}

const Caption: React.FC<Props> = ({ caption, overflow = "elipsis" }) => {
  const clName = overflow === 'none' ? 'whitespace-break-spaces' : "overflow-hidden overflow-ellipsis whitespace-nowrap";
  return <div className={clName}>{renderCaptionWithTags(caption)}</div>;
};

export default Caption;