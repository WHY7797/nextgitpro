import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import { Button } from "antd";
import { connect } from "react-redux";
import "../test.css";
import {add} from "../store/store";


const Index=({counter,username,rename,add}) => {
  function gotoTestB() {
    // Router.push('/test/b')
    Router.push({
        pathname:'/test/b',
        query:{
            id:'2',
        }
    },'/test/b/2')
  }
  return (
    // <>
    //   <Link href="/a?id=1" as="/a/1">
    //     <Button>Index</Button>
    //   </Link>
    //   <Button onClick={gotoTestB}>Index</Button>
    // </>
    <div>
      <span>{counter}</span>
      <a href="">{username||''}</a>
      <input value={username||''} onChange={(e)=>rename(e.target.value)}></input>
      <button onClick={(e)=>add(counter)}>点我加自己DOADD</button>
    </div>
  )
}
Index.getInitialProps=async({reduxStore})=>{
  reduxStore.dispatch(add(3))
  return {}
}
export default connect(
  function mapStateToProps(state){
    return{
      counter:state.count.count,
      username:state.user.username
    }
  },function mapDispatchToProps(dispatch){
    return{
      add:(num)=>dispatch({type:'ADD',num}),
      rename:(name)=>dispatch({type:'UPDATE_USERNAME',name})
    }
  }
)(Index)