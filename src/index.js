import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes, Link, NavLink, useParams} from 'react-router-dom'; //router 임포트
// 라우터를 학습하기 위함
// App.js를 임포트 하지않고 여기서 직접 생성(임포트 삭제)
//react router dome 설치
//특정 url에 따른 컴포넌트가 해당 컴포넌트에 위치하도록 사용
function Home() {
  return (<div>
    <h2>Home</h2>
    Home....
  </div>)
}

let contents = [
  {id:1, title:'HTML',description:'Html is ....'},
  {id:2, title:'CSS',description:'Css is ....'},
  {id:3, title:'REACT',description:'React is ....'}
]

function Topic(){
  let params = useParams(); //컴포넌트 파라미터로 :topic_id로 되어있는 topic_id를 받을수 있다. 
  let selected_topic = {
    title:'Sorry',
    description:'Not Found...'
  }
  console.log(`params : ${params.topic_id}`);
  const title = contents.find(x => x.id === Number(params.topic_id)).title;
  const description = contents.find(x => x.id === Number(params.topic_id)).description;

  return (
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.description}
    </div>
  )
}

function Topics() {
  let lis = [];
  contents.forEach(content=>lis.push(<li key={content.id}><NavLink to={'/topics/' + content.id}>{content.title}</NavLink></li>));
  return (<div>
    <h2>Topics</h2>
    <ul>
      {lis}
    </ul>
    <Routes>
      <Route path=':topic_id' element={ <Topic /> }></Route>
    </Routes>
  </div>)
}

function Contact() {
  return (<div>
    <h2>Contact</h2>
    Contact....
  </div>)
}

/* react-router-dom v6부터는 
Switch 대신 Routes를 사용 
Route 안에 component 대신 element 사용 */
//속성으로 path를 넣어 path를 설정한다.

//spa 방식을 위해 href로 페이지 이동시에는 페이지 전체를 다시 로드하지만 Link 컴포넌트는 해당 컴포넌트만 불러와준다.
//또한 Link를 사용해도 되지만 NavLink를 사용할 경우 현재 이벤트가 발생한 class:active 속성이 생긴다. 이를 활용하여 클릭한 버튼에 특정 css를 주거나 기능을 줄수있다.

//매우중요한 개념!!!!!!!!!!!!!!!
//React Router를 사용할때는 <Router> 컴포넌트는 한개만 사용할수 있다. ( BrowserRouter 역시 마찬가지)
//그리고 중첩 라우팅을 사용하기 위해서는 먼저 <Route path='/topics/*' element={ <Topics /> }></Route> 처럼 와일드카드(*)를 사용하여 Topics라는 컴포넌트로 일단 보낸다.
//그곳에 있는 route에서 다시 경로를 분리하는 것이다. 분리할때는 : (와일드카드) 기호를 사용하여 들어오는 값을 topic_id에 담을수 있다.
function App() {
  return (<> <div>
    <h1>Hello React Router DOM</h1>
    <ul>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/topics'>Topics</NavLink></li>
      <li><NavLink to='/contact'>Contact</NavLink></li>
    </ul>
    <Routes>
      <Route path='/' element={ <Home /> }></Route>
      <Route path='/topics' element={ <Topics /> }></Route>
      <Route path='/contact' element={ <Contact /> }></Route>
      <Route path='/topics/*' element={ <Topics /> }></Route>
    </Routes>
  </div>
  </>)
}

//BrowserRouter는 react router dom을 적용하려는 컴포넌트의 최상위 컴포넌트를 감싸주는 lapper 컴포넌트
//react router dom을 사용하기 위한 준비작업이라고 생각하면 됨
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter><App /></BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
