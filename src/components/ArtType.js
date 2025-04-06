const ArtType = (props)=>{
    return(
        <p>{props.artType.name} {" ("}{props.artType.creationMethod}{" from "}{props.artType.region}{")"}</p>
    )
}

export default ArtType;