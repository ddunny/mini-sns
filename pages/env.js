require('dotenv').config();

const Env = (props) => (
    <>
        <div>
            {props.FB_API_HOST}
        </div>
        {JSON.stringify(process.env)}
    </>
)

Env.getInitialProps = async () => {
    return {
        FB_API_HOST: process.env.FB_API_HOST
    }
}

export default Env;