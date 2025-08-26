import Tabs from '@/src/components/primitives/Tabs';

export default function DayModal({
  setIsVisible,
}: {
  setIsVisible: (state: boolean) => void;
}) {
  return (
    <div className='absolute left-2 top-2 w-[340px] px-6 py-8 z-[1] bg-white rounded-2xl shadow'>
      <Tabs.Root defaultValue='mua'>
        <Tabs.List>
          <Tabs.Trigger value='mua'>므아</Tabs.Trigger>
          <Tabs.Trigger value='jigyeong'>지경</Tabs.Trigger>
          <Tabs.Trigger value='ribbit'>개굴</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='mua'>므아는 므아다</Tabs.Content>
        <Tabs.Content value='jigyeong'>지경은 므아지경이다</Tabs.Content>
        <Tabs.Content value='ribbit'>개굴풋푸~</Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
