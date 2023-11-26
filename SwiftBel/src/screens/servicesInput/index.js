import React from "react";
import {View,Text} from 'react-native'
import CarpetCleaningInput from "./CarpetCleaningInput";
import CleaningInput from "./CleaningInput";
import ElectricianInput from "./ElectricianInput";
import GuterCleaning from "./GuterCleaning";
import HVACINput from "./HVACInput";
import MovingInput from "./MovingInput";
import PlumberInput from "./PlumberInput";
import PreasureWashingInput from "./PressureWashingInput";
import RugCleaningInput from "./RugCleaningInput";
import WindowWashingInput from "./WindowWashing";
const ServiceInput=(props)=>{
    console.log(props.TYPE,"type")
    switch (props.TYPE) {
        case "Moving":
            return(
            <MovingInput
            {...props}
            headerName={'Moving'}
            isVisible={props.isVisible}
            value={props?.value}
            buttonStyle={{ width: '93%' }}
            setTypeIndex={(value)=>props?.setTypeIndex(value)}
            onChange={(item) => {
               
            }}
            onselect={()=>props?.onselect()}
            onCancel={() => props?.onCancel()}
            />
            )
        case "Electricians":
            return(
            <ElectricianInput
            {...props}
            headerName={'Electricians'}
            isVisible={props.isVisible}
            value={props?.value}
            buttonStyle={{ width: '93%' }}
            onChange={(item) => {
               
            }}
            onselect={()=>props?.onselect()}
            onCancel={() => props?.onCancel()}
            />)
        case "HVAC Technicians":
            return(
                <HVACINput
                {...props}
                headerName={'HVAC Technicians'}
                isVisible={props.isVisible}
                value={props?.value}
                buttonStyle={{ width: '93%' }}
                onChange={(item) => {
                   
                }}
                onselect={()=>props?.onselect()}
                onCancel={() => props?.onCancel()}
                />)
        case "Plumbers":
            return(
                <PlumberInput
                {...props}
                headerName={'Plumbers'}
                isVisible={props.isVisible}
                value={props?.value}
                buttonStyle={{ width: '93%' }}
                onChange={(item) => {
                   
                }}
                onselect={()=>props?.onselect()}
                onCancel={() => props?.onCancel()}
                />)
        case "Pressure Washing":
            return(
                <PreasureWashingInput
                {...props}
                type={props?.type}
                headerName={'Pressure Washing'}
                isVisible={props.isVisible}
                value={props?.value}
                buttonStyle={{ width: '93%' }}
                onChange={(item) => {
                   
                }}
                onselect={()=>props?.onselect()}
                onCancel={() => props?.onCancel()}
                />
            )
        case "Furniture Assembly":
            return(
                <CleaningInput
                headerName={'Furniture Assembly'}
                isVisible={props.isVisible}
                value={props?.value}
                buttonStyle={{ width: '93%' }}
                onChange={(item) => {
                   
                }}
                onselect={()=>props?.onselect()}
                onCancel={() => props?.onCancel()}
                />
            )
        case "Gutter Cleaning":
            return(
                <GuterCleaning
                headerName={'Gutter Cleaning'}
                isVisible={props.isVisible}
                value={props?.value}
                buttonStyle={{ width: '93%' }}
                onChange={(item) => {
                   
                }}
                onselect={()=>props?.onselect()}
                onCancel={() => props?.onCancel()}
                />
            )
        case "Carpet Cleaning":
            return(
                <CarpetCleaningInput
                {...props}
                headerName={'Carpet Cleaning'}
                isVisible={props.isVisible}
                value={props?.value}
                buttonStyle={{ width: '93%' }}
                onChange={(item) => {
                   
                }}
                onselect={()=>props?.onselect()}
                onCancel={() => props?.onCancel()}
                />
            )
        case "Pressure Washing 2":
            return(
                <RugCleaningInput
                headerName={'Rug Cleaning'}
                isVisible={props.isVisible}
                value={props?.value}
                buttonStyle={{ width: '93%' }}
                onChange={(item) => {
                   
                }}
                onselect={()=>props?.onselect()}
                onCancel={() => props?.onCancel()}
                />
            )
        case "Window Cleaning":
            return(
                <WindowWashingInput
                headerName={'Window Cleaning'}
                isVisible={props.isVisible}
                value={props?.value}
                buttonStyle={{ width: '93%' }}
                onChange={(item) => {
                   
                }}
                onselect={()=>props?.onselect()}
                onCancel={() => props?.onCancel()}
                />
            )
        default:
            return
    }

}
export default ServiceInput