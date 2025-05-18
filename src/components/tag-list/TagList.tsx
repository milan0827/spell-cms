const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <ul className="flex gap-2 flex-wrap mt-4 ">
      {tags.map((tag, i) => (
        <li
          key={i}
          className="bg-gray-200 rounded-full py-1 px-4 text-gray-600"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default TagList;
