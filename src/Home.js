import React from 'react'
import { showOutput } from "./Output"
const Home = () => {

    return (
        <>
            <div>
                <textarea id="input-text" rows="5" cols="50" placeholder="한 여름 퇴근길 올려다 본 하늘"></textarea>
            </div>
            <div>
                <button onClick={() => showOutput()}>색 추천 요청</button>
            </div>
            <div id="output-text"></div>
        </>
    )
}

export default Home