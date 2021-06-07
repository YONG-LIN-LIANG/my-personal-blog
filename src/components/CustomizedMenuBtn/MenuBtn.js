import React,{useState} from 'react'
import styled from 'styled-components';
const StyledBurger = styled.div`
    width: 2rem;
    height: 2rem;
    display:flex;
    justify-content:space-around;
    flex-flow:column wrap; 
    transform:translateX(-80px);
    cursor:pointer;
    div{
        width:2rem;
        height:0.25rem;
        background: ${({open})=>open ? '#000' : '#fff'};
        border-radius:10px;
        transform-origin:1px;
        transition:all 0.3s linear;
        &:nth-child(1){
            transform:${({open})=>open ?'rotate(45deg)' :'rotate(0deg)'};
        }
        &:nth-child(2){
            transform:${({open})=>open ?'translateX(100%)' :'translateX(0)'};
            opacity:${({open})=>open ? 0 : 1};
        }
        &:nth-child(3){
            transform:${({open})=>open ?'rotate(-45deg)' :'rotate(0deg)'};
        }
    }
    `; 
const MenuBtn = () => {
    const [open, setOpen] = useState(false)
    return (
        <StyledBurger open={open} onClick={()=>setOpen(!open)}>
            <div/>
            <div/>
            <div/>
        </StyledBurger>
    )
}

export default MenuBtn
