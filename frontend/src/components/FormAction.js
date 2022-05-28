export default function FormAction({
    handleSubmit,
    type='Button',
    action='submit',
    text
}){
    return(
        <>
        {
            type==='Button' ?
            <button
                type={action}
                className="group w-full mx-auto flex justify-center py-2 px-4 border border-transparent text-m font-medium rounded-md text-white bg-gray-900 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 my-10"
                onSubmit={handleSubmit}
            >
                {text}
            </button>
            :
            <></>
        }
        </>
    )
}