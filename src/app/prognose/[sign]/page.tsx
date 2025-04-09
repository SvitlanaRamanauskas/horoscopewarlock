import { useRouter } from "next/router";

const ForecastForSignPage = () => {
  const router = useRouter();
  const { sign } = router.query;

  return (
    <div>
      <h3> Прогноз для знаку {sign} </h3>
    </div>
  );
}

export default ForecastForSignPage;