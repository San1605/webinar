import Header from '../Components/Header'
import WebinarPage from '../Components/WebinarPage'

const Home = () => {

    return (
        <div className='flex flex-col h-full w-full '>
            {/*  header component */}
            <Header /> 
            {/*  WebinarPage component to show all webinars */}
            <WebinarPage />
        </div>
    )
}

export default Home
