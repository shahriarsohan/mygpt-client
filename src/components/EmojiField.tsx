import { Popover } from "@headlessui/react";
import EmojiPicker from "emoji-picker-react";

export const EmojiField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <>
    <Popover className="relative mb-3">
      <Popover.Button>
        <span className="inline-flex rounded-lg bg-gray-800 p-3">
          <div
            className="flex h-6 w-6 items-center justify-center"
            aria-hidden="true"
          >
            {value}
          </div>
        </span>
      </Popover.Button>

      <Popover.Panel className="absolute z-10">
        <EmojiPicker onEmojiClick={({ emoji }) => onChange(emoji)} />
      </Popover.Panel>
    </Popover>
  </>
);
