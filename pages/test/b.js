import Comp from '../../components/comp'
import {withRouter} from 'next/router'
import React,{Component,useState,useEffect,useReducer,useLayoutEffect,useContext,useRef,memo,useCallback,useMemo} from 'react'
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
    const config=useMemo(()=>({
        text:`count is ${count}`,
        color:count>3?'red':'blue'
    }),[count])
    const handleButtonClick=useCallback(() => dispatchCount({type:'add'}),[])
    return <div>
            <input value={name} onChange={(e)=>setName(e.target.value)}/>
            <Child
                config={config}
                onButtonClick={handleButtonClick}
            >
            </Child>
        </div>
}
export default MycountFunc
const Child=memo( function Child ({onButtonClick,config}){
    console.log('child render');
    return (
        <button
            onClick={onButtonClick}
            style={{color:config.color}}
        >
            {config.text}
        </button>
    )
})




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