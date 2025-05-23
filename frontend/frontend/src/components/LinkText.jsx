export function LinkText ({linktext, url})
{
    return (
        <div className = "link-text" >
            <a href={url}>{linktext}</a>
        </div>
    )
}