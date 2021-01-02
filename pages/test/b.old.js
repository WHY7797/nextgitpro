import Comp from '../../components/comp'
import {withRouter} from 'next/router'
import React,{Component,useState,useEffect,useReducer,useLayoutEffect,useContext,useRef} from 'react'
import MyContext from "../../lib/my-context";
import myContext from '../../lib/my-context';
function countReducer(state,action){
    switch(action.type){
        case 'add':
            return state+1
        case 'minux':
            return state-1
            default:
                return state
    }
}
function MycountFunc(){
    // const [count ,setCount]=useState(0)
    const [count ,dispatchCount]=useReducer(countReducer,0)
    const [name,setName]=useState('WHY')
    const context=useContext(myContext)
    const inputRef=useRef()

    useEffect(()=>{
        const interval = setInterval(()=>{
            // setCount(c=>c+1)
            dispatchCount({type:'add'})
        },1000)
        return () => clearInterval(interval)
    },[])
    // return <span>{count}</span>
    useEffect(()=>{
        console.log('effect invoked');
        console.log(inputRef)
        return () => console.log('effect deteched');
    },[count])
    //会在生成dom之前执行在useEffect之前
    // useLayoutEffect(()=>{
    //     console.log('useLayoutEffect invoked');
    //     return () => console.log('useLayoutEffect deteched');
    // },[count])
    return <div>
            <input ref={inputRef} value={name} onChange={(e)=>setName(e.target.value)}/>
            <button onClick={()=>dispatchCount({type:'add'})}>{count}</button>
            <p>{context}</p>
        </div>
}
export default MycountFunc





// class Mycount extends Component{
//     state={
//         count:0
//     }
//     componentDidMount(){
//         this.interval =setInterval(()=>{
//             this.setState({count:this.state.count+1})
//         },1000)
//     }
//     componentWillUnmount(){
//         if(this.interval){
//             clearInterval(this.interval)
//         }
//     }
//     render(){
//         return(
//             <span>{this.state.count}</span>
//         )
//     }
// }
// export default Mycount












// const B=({router,name})=> <Comp>B {router.query.id}{name}</Comp>
// B.getInitialProps=()=>{
//     return {
//         name:'BBB'
//     }
// }
// export default withRouter(B)