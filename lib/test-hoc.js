export default (Comp)=>{
    function TestHocComp({Component,pageProps,...rest}){
        console.log(Component);
        console.log(pageProps);
        if(pageProps){
            pageProps.test='123'
        }
        return <Comp Component={Component} pageProps={pageProps} {...rest}></Comp>
    }
    TestHocComp.getInitialProps=Comp.getInitialProps
    return TestHocComp
    // return function TestHocComp({name},...props){
    //     const name = name + '123'
    //     return <Comp {...props}></Comp>
    // }
}