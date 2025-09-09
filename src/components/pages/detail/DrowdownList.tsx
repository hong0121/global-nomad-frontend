'use client';

import DeleteActivityButton from '../../primitives/DeleteActivityButton';
import UpdateActivityButton from '../../primitives/UpdateActivityButton';

interface Props {
  activityId: number;
}

export default function DropdownList({ activityId }: Props) {
  return (
    <>
      <div className='flex flex-col justify-around w-24 h-27 bg-white border border-[#dfdfdf] rounded-[8px] shadow-[0px_0px_3px_0px_#dde6ef]'>
        <UpdateActivityButton activityId={activityId} />
        <DeleteActivityButton activityId={activityId} />
      </div>
    </>
  );
}
