 
import React, { Suspense } from 'react'
import Header from '../Header/Header';
import './Home.css';

const Home = () => {
  return (
    <>
      <>
        <Suspense fallback={<>loading....</>}>
          <Header />
        </Suspense>
      </>
      <div className="Home">
        <h1>
          You can visit the boards page to see the Trello-clone functionality.
        </h1>
      </div>
    </>
  );
}

export default Home