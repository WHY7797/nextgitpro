// import Comp from "../components/comp";
import { withRouter } from "next/router";
import Link from "next/link";
import styled from 'styled-components';
// import moment from 'moment';
import Document, { Html, Head, Main, NextScript } from "next/document";
import dynamic from "next/dynamic";
const color ='#113366'
const Title=styled.h1`
    color:yellow;
    font-size:40px;
`
const Comp =dynamic(import ("../components/comp"))
const A = ({ router, name ,time}) => (
  <>
    <Title>THIS IS Title{time}</Title>
    <Comp></Comp>
    <Link href="aaa">
      <a className='link'>
        A {router.query.id}
        {name}
        
      </a>
    </Link>
    <style jsx>
      {`
        a {
          color: blue;
        }
        .link{
          color:${color};
        }
      `}
    </style>
    {/* <style jsx global>
      {`
        a {
          color: {color}
        }
        .link{
          color:red;
        }
      `}
    </style> */}
  </>
);
A.getInitialProps = async (ctx) => {
  const moment = await import('moment')
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
          name:'why',
          time:moment.default(Date.now()-60*1000).fromNow()
      })
    })
  })
  return await promise
}
export default withRouter(A);
