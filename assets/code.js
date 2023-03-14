/**
 * Program: code.js
 *
 * Definition: holds all functions used by the HTML
 *
 * Author: Katie Silva
 *
 * Date: 3/7/2019
 *
 * History: 3/8/2019 added better comments
 */

 /**
 * function: menu
 *
 * Definition: opens and closes the menu, as well as changes the url to match.
 *
 * Author: KatieSilva
 *
 * Date: 3/5/2019
 *
 * History: 3/7/2019 added keeping the menu open on page change
 *          3/8/2019 added better comments
 */
function menu(addClass, removeClass)
{
    //if it's open without an animation, that's only ever used on load, so remove it
    if (document.getElementById("menu").classList.contains("open"))
    {
        document.getElementById("menu").classList.remove("open");
    }

    //if it contains the class it expects the previous animation to be on
    if (document.getElementById("menu").classList.contains(removeClass))
    {
        document.getElementById("menu").classList.remove(removeClass);
    }

    //add the class to start the animation
    document.getElementById("menu").classList.add(addClass);

    // if the menu is open, add that to the url, otherwise, add that it's closed to the url
    if (addClass == "closeAnim")
    {
        history.replaceState(null, null, replace(location.href, "menu=true", "menu=false"));
    }
    else
    {
        history.replaceState(null, null, replace(location.href, "menu=false", "menu=true"));
    }

}
 /**
 * function: replace
 *
 * Definition: replace or add to the end of a string
 *
 * Author: Katie Silva
 *
 * Date: 3/7/2019
 *
 * History: 3/8/2019 added better comments
 */
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
 /**
 * function: checkScroll
 *
 * Definition: makes the header opaque when the page has scrolled, and tranparent when at the top
 *
 * Author: Katie Silva
 *
 * Date: 3/5/2019
 *
 * History: 3/8/2019 added better comments
 */
function checkScroll()
{
    // from https://stackoverflow.com/questions/11373741/detecting-by-how-much-user-has-scrolled
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : 
    (document.documentElement || document.body.parentNode || document.body).scrollTop; 
    // my code

    // if not at the top
    if (scrollTop > 1)
    {
        //make the header opaque
        document.getElementById("header").classList.remove("clearAnim");
        document.getElementById("header").classList.add("opaqueAnim");
    }
    else
    {
        //make the header transparent
        document.getElementById("header").classList.remove("opaqueAnim");
        document.getElementById("header").classList.add("clearAnim");
    }
}
 /**
 * function: getUrlVars
 *
 * Definition: this was found online, but it appears to be using a regex 
 *             expression to convert the url into a dictionary
 * 
 * Author: https://html-online.com/articles/get-url-parameters-javascript/
 *
 * Date: ???
 *
 * History: 3/8/2018 added whitespace
 */
function getUrlVars() 
{
    var vars = {};

    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });

    return vars;
}
 /**
 * function: checkUrl
 *
 * Definition: if the url says menu = true, start with the menu open
 *
 * Author: Katie Silva
 *
 * Date: 3/7/2019
 *
 * History: 3/8/2019 added better comments
 */
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
