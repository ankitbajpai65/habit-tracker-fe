export default function LocalLoader(props: {
  status: boolean;
  size: number;
  style?: string;
}) {
  return (
    <>
      {props.status && (
        <div
          style={{
            height: `${props.size}px`,
            width: `${props.size}px`,
          }}
          className={`inline-block text-medswan-200 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        >
          {/* <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span> */}
        </div>
      )}
    </>
  );
}
