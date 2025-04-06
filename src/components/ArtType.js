const ArtType = (props)=>{
    return(
        <>
        {props.details ? <p>{props.details.name} {" ("}{props.details.creationMethod}{" from "}{props.details.region}{")"}</p> : ""}
        </>
    )
}

export default ArtType;