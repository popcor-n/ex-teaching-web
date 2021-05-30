import styled from 'styled-components'
// import logoPic from '../../static/logo.png'
export const LoginWrapper = styled.div`
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  top:0px;
  background:#eee;
  text-align:center;
`;
export const Logo = styled.div`
  position: absolute;
  top: 56px;
  margin-left: 50px;
`;
export const LogoPic = styled.div`
  width:400px;
  ${'' /* background-image:url(${logoPic}); */}
  height:46px;
  background-size:400px;
`;
export const Main = styled.div`
    width: 400px;
    margin: 100px auto 0;
    padding: 50px 50px 30px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    vertical-align: middle;
    display: inline-block;
    box-sizing: border-box;
    a{
        text-decoration:none;
        color:#888
    }
    .title{
        margin: 0 auto 50px;
        padding: 10px;
        font-weight: 400;
        color: #969696;
        font-size:18px;
        .active{
            font-weight: 700;
            color: #ea6f5a;
            border-bottom: 2px solid #ea6f5a;
            padding:10px;
        }
        b{
            padding:10px;
            font-weight:700;
        }
        .signup{
            padding:10px;
            color:#969696;
        }
    }
`;
export const Input = styled.div`
  position:relative;
  margin-bottom:0;
  position:relative;
  width:100%;
  input{
    width: 100%;
    height: 50px;
    line-height:50px;
    font-size:14px;
    padding: 4px 10px 4px 35px;
    display:block;
    border: 1px solid #c8c8c8;
    background-color: hsla(0,0%,71%,.1);
    vertical-align: middle;
    outline:none;
    box-sizing: border-box;
  }#number{
    border-bottom: none;
    border-radius: 4px 4px 0 0;    
  }#nick{
    border-bottom:none;
  }#code{
    border-bottom:none;
  }
  #password{
    border: 1px solid #c8c8c8;
    border-radius: 0 0 4px 4px;    
  }
  .iconfont{
    position:absolute;
    left:10px;
    top:15px;
    display: block;
    width:10px;
    height:10px;
  }
`;
export const Button = styled.div`
  width:100%;
  height:50px;
  line-height:50px;
  line-height:30px;
  padding:9px 18px ;
  color:#fff;
  background:#3194d0;
  border-radius:15px;
  margin:30px auto;
  text-align:center;
  cursor:pointer;
  box-sizing:border-box;
`;
export const GetCodeBt = styled.div`
  border: 1px solid #dedede;
  position: absolute;
  top: 0%;
  left: 78%;
  width: 66px;
  height: 100%;
  font-size: 13px;
  box-sizing: border-box;
  line-height: 100%;
  color: #eb735b;
  padding-top: 10px;
  cursor: pointer;
  border-radius: 0 4px 0 0;
`;