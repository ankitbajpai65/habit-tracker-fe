export default function LocalLoader(props: { status: boolean; size: number }) {
  return (
    <>
      {props.status && (
        <div
          className={`inline-block size-${props.size} text-medswan-200 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
          // className={`inline-block h-${props.size} w-${props.size} text-medswan-200 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
    </>
  );
}
