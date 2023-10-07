import { useState } from "react";

type Props = {
  attrName: string;
  readOnly: boolean;
};

function TextAttributeItem({ attrName, readOnly }: Props) {
  const [value, setValue] = useState(attrName);
  return (
    <div className="grow">
      <input
        className="w-full outline-none bg-transparent"
        type="text"
        value={value}
        readOnly={readOnly}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}

export default TextAttributeItem;
