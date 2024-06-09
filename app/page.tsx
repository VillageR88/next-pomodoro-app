import LayoutHome from './home/layout';
import YourInfo from './home/YourInfo';
import SelectPlan from './home/SelectPlan';
import Addons from './home/Addons';
import Summary from './home/Summary';
import ThankYou from './home/ThankYou';

export default function Home() {
  return (
    <LayoutHome>
      <YourInfo />
      <SelectPlan />
      <Addons />
      <Summary />
      <ThankYou />
    </LayoutHome>
  );
}
