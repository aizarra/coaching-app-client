import CalendarComp from '../components/Calendar';
import ClientsList2 from '../components/ClientsList2';
import WoPlan from '../components/WoPlan';
import '../index.css';

function DashboardTrainer() {
  return (
    <>
      <>
        <p className="text-gray-700 text-3xl mb-16 fontFamily: Barlow Semi Condensed  text-center">
          Trainer Dashboard
        </p>

        <div className="grid lg:grid-cols-2 gap-5 mb-16">
          <ClientsList2 />
          {/* <div className="rounded bg-white h-40 shadow-sm"></div> */}
          <CalendarComp />
        </div>
        <div
          className="grid col-1 bg-white h-96 shadow-sm"
          for="woplan">
          <WoPlan />
        </div>
      </>
    </>
  );
}

export default DashboardTrainer;
