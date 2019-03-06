function menu(addClass, removeClass)
{
    if (document.getElementById("menu").classList.contains("open"))
    {
        document.getElementById("menu").classList.remove("open");
    }
    if (document.getElementById("menu").classList.contains(removeClass))
    {
        document.getElementById("menu").classList.remove(removeClass);
    }
    document.getElementById("menu").classList.add(addClass);
    if (addClass == "closeAnim")
    {
        history.replaceState(null, null, replace(location.href, "menu=true", "menu=false"));
    }
    else
    {
        history.replaceState(null, null, replace(location.href, "menu=false", "menu=true"));
    }

}
function replace(str, a, b)
{
    retval = "";
    if (str.includes(a))
    {
        retval = str.replace(a, b);
    }
    else
    {
        retval = str + "?" + b;
    }
    return retval;
}
function checkScroll()
{
    // from https://stackoverflow.com/questions/11373741/detecting-by-how-much-user-has-scrolled
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : 
    (document.documentElement || document.body.parentNode || document.body).scrollTop; 
    // my code
    if (scrollTop > 1)
    {
        document.getElementById("header").classList.remove("clearAnim");
        document.getElementById("header").classList.add("opaqueAnim");
    }
    else
    {
        document.getElementById("header").classList.remove("opaqueAnim");
        document.getElementById("header").classList.add("clearAnim");
    }
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
function checkUrl()
{
    var url = getUrlVars();
    if (url["menu"] != null && url["menu"] == "true")
    {
        if (document.getElementById("menu").classList.contains("closeAnim"))
        {
            document.getElementById("menu").classList.remove("closeAnim");
        }
        document.getElementById("menu").classList.add("open");
    }
}