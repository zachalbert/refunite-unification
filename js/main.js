jQuery(document).ready(function($) {

/**
 * Get the utm_ GET variables, both for tracking and landing page optimization
 *
 * README:
 * Use the URL builder to build your campaign links: https://support.google.com/analytics/answer/1033867?hl=en
 * Then, replace text in the dom with more relevant text for a given campaign.
 * See example below.
 *
 * TODO:
 * This is probably terrible for SEO. Probably shouldn't be using js to do this.
**/
var $_GET = {};
if(document.location.toString().indexOf('?') !== -1) {
  var query = document.location
                .toString()
                // get the query string
                .replace(/^.*?\?/, '')
                // and remove any existing hash string (thanks, @vrijdenker)
                .replace(/#.*$/, '')
                .split('&');

  for(var i=0, l=query.length; i<l; i++) {
   var aux = decodeURIComponent(query[i]).split('=');
   $_GET[aux[0]] = aux[1];
  }
}
var campaign_source = $_GET['utm_source'];
var campaign_medium = $_GET['utm_medium'];
var campaign_term = $_GET['utm_term'];
var campaign_content = $_GET['utm_content'];
var campaign_name = $_GET['utm_campaign'];

// Manipulate DOM for different campaigns
if( campaign_name == 'southsudan' ) {
  // Hide all default elements
  $('.campaign_default').hide();
  // Unhide the campaign specific elements
  $('.campaign_'+campaign_name).removeClass('hide');
}

});