import PropTypes from "prop-types";
import TagList from "./TagList";

function InputTag({ defaultTags, onAddTag, onDeleteTag, placeholder }) {
  const onKeyUp = (e) => {
    if (e.which === 32 || e.which === 13) {
      let input = e.target.value.trim().split(",");
      const pattern = /^[a-zA-Z\s]+$/gm;
      const result = pattern.test(input[0]);

      if (result === false)
        return;
      if (input.length === 0 || input[0] === "") return;

      onAddTag(input[0]);

      e.target.value = "";
    }
  };

  return (
    <div
      className="border border-slate-300 h-10 w-[96%] mx-auto lg:mx-0 lg:w-full rounded text-slate-500 px-2 py-[1px] my-1 lg:my-0 flex flex-wrap gap-1 text-xs"
    >
      <TagList tags={defaultTags} onDeleteTag={onDeleteTag} />
      <input
        onKeyUp={(e) => onKeyUp(e)}
        type="text"
        title={placeholder}
        placeholder={placeholder}
        className=" w-1/3 lg:w-3/6 outline-none inline py-2 overflow-hidden"
      />
      {
        defaultTags.length > 0 ? "" : <p className="text-xs pl-2 pt-2 text-slate-400">press space to create tag</p>
      }
    </div>
  );
}

InputTag.propTypes = {
  defaultTags: PropTypes.array,
  onAddTag: PropTypes.func,
  onDeleteTag: PropTypes.func,
  placeholder: PropTypes.string,
  inputClass: PropTypes.string,
};

export default InputTag;
