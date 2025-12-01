import Loader from "../common/Loader";
import NoData from "../common/NoData";
import VoucherCard from "../football/VoucherCard";
import { useFetchBetHistory } from "../hooks/useFetchBetHistory";

const Vouchers = () => {
  const { data, loading } = useFetchBetHistory();

  if(loading){
    return <Loader />;
  };
  return (
    <div className="p-3">
        {
          data.length > 0 ?
          data.map((voucher:any) =>
            <VoucherCard key={voucher?.id} voucher={voucher} />
          )
          :
          <NoData text='မှတ်တမ်းများ မရှိပါ' loading={loading} />
        }
    </div>
  )
}

export default Vouchers;
