
import { Button, Popover } from "flowbite-react";

export function PopUpStageD() {
  const content = (
    <div className="w-60 text-sm text-gray-500 dark:text-gray-400">
        <p>Please enter a valid informations of stage to delete it .</p>
    </div>
  );

  return (
    <div className="flex gap-2">
      <Popover content={content} placement="bottom">
        <Button>Delete</Button>
      </Popover>
    </div>
  );
}
