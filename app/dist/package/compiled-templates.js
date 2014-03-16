Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "growl", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  return buffer;
  
});

Ember.TEMPLATES["session"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1>Invalid Session Token</h1>");
  
});

Ember.TEMPLATES["tutorial"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n            ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("active")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['carousel-slide'] || depth0['carousel-slide']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "carousel-slide", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  if (stack2 = helpers['carousel-slide']) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0['carousel-slide']; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  hashTypes = {};
  hashContexts = {};
  if (!helpers['carousel-slide']) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  if (stack2 = helpers['carousel-slide']) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0['carousel-slide']; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  hashTypes = {};
  hashContexts = {};
  if (!helpers['carousel-slide']) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                <div class=\"container-fluid carousel-slide-header\">\n                    <div class=\"row\">\n                        <div class=\"col-md-9 col-xs-12\">\n                            <h1>Hi ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "model.firstName", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(",</h1>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"container-fluid\">\n                    <div class=\"row bg-fill-white\">\n                        <div class=\"col-md-12 bottom-buffer\">\n                            <h2>\n                                ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  stack1 = helpers._triageMustache.call(depth0, "model.dealerName", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" is using <img class=\"inlineLogo\" src=\"resources/t2d_logo-300.png\" alt=\"Text2Drive\">\n                            </h2>\n                        </div>\n                        <div class=\"col-md-5 bottom-buffer\">\n                            <h3>\n                                <img class=\"inlineLogo\" src=\"resources/t2d_logo-300.png\" alt=\"Text2Drive\"> connects you\n                                with your customers via\n                                text messages.\n                            </h3>\n                        </div>\n                        <div class=\"col-md-7 text-center bottom-buffer\">\n                            <img class=\"col-md-10 illustrationPoint\" src=\"resources/t2d_communication_system.png\" alt=\"Text2Drive is a Mobile Communication Portal\">\n                        </div>\n                    </div>\n                    <div class=\"row bg-fill-lightgrey drop-top text-center\">\n                        <img class=\"col-md-3 bottom-buffer top-buffer\" src=\"resources/t2d_setuptime.png\">\n                        <h3 class=\"col-md-5 bottom-buffer top-buffer blue-text\">\n                            Setup & Training will\n                            <br>take about 10 minutes\n                        </h3>\n                        <div class=\"col-md-4 bottom-buffer top-buffer\">\n                            <a class=\"btn btn-primary btn-lg giantActionButton blue-button next\" ");
  hashContexts = {'target': depth0};
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "nextCarouselSlide", {hash:{
    'target': ("view.parentView")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Get Started!</a>\n                        </div>\n                    </div>\n                </div>\n            ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n                <div class=\"container-fluid carousel-slide-header\">\n                    <div class=\"row\">\n                        <div class=\"col-md-9 col-xs-12\">\n                            <h1>Why Texting?</h1>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"container-fluid\">\n                    <div class=\"row bg-fill-white\">\n                        <a class=\"btn btn-primary btn-large pull-left previous backButton\" ");
  hashContexts = {'target': depth0};
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "previousCarouselSlide", {hash:{
    'target': ("view.parentView")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Go Back</a>\n                    </div>\n                    <div class=\"row bg-fill-white\">\n                        <div class=\"col-md-12 bottom-buffer\">\n                            <h3 class=\"blue-text\">Easier & Faster</h3>\n                            <p>Lorem Ipsum Dolor Sic Etiam Arma Virumque Cano, Troiae Qui Primus Ab Oris.</p>\n                        </div>\n                        <div class=\"col-md-12 bottom-buffer\">\n                            <h3 class=\"blue-text\">More Polite</h3>\n                            <p>Lorem Ipsum Dolor Sic Etiam Arma Virumque Cano, Troiae Qui Primus Ab Oris.</p>\n                        </div>\n                        <div class=\"col-md-12 bottom-buffer\">\n                            <h3 class=\"blue-text\">Makes You Money</h3>\n                            <p>Lorem Ipsum Dolor Sic Etiam Arma Virumque Cano, Troiae Qui Primus Ab Oris.</p>\n                        </div>\n                        <div class=\"col-md-12 bottom-buffer\">\n                            <a class=\"btn btn-primary btn-large pull-right next blue-button continueButton\" ");
  hashContexts = {'target': depth0};
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "nextCarouselSlide", {hash:{
    'target': ("view.parentView")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Continue</a>\n                        </div>\n                    </div>\n                </div>\n\n\n\n\n            ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n                <div class=\"container-fluid carousel-slide-header\">\n                    <div class=\"row\">\n                        <div class=\"col-md-9 col-xs-12\">\n                            <h1>Confirm Your Information</h1>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"container-fluid\">\n                    <div class=\"row bg-fill-white\">\n                        <a class=\"btn btn-primary btn-large pull-left previous backButton\" ");
  hashContexts = {'target': depth0};
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "previousCarouselSlide", {hash:{
    'target': ("view.parentView")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Go Back</a>\n                    </div>\n                </div>\n            ");
  return buffer;
  }

  data.buffer.push("<div class=\"progress\">\n        <div class=\"progress-bar progress-bar-t2d-red\" ");
  hashContexts = {'style': depth0};
  hashTypes = {'style': "ID"};
  options = {hash:{
    'style': ("progressCompletedWidth")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("></div>\n        <div class=\"progress-bar progress-bar-t2d-yellow\" ");
  hashContexts = {'style': depth0};
  hashTypes = {'style': "ID"};
  options = {hash:{
    'style': ("progressSingleWidth")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n            <span class=\"hidden-xs\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "currentSlideNumber", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" / ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "slideCount", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n        </div>\n</div>\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-3 col-xs-12 pull-right sidebar-header\">\n            <img class=\"logoImg\" src=\"resources/t2d_logo-300.png\" alt=\"Text2Drive\">\n            <span class=\"logoText\">37483 (DRIVE)</span>\n        </div>\n\n        ");
  hashContexts = {'activeIndex': depth0,'class': depth0};
  hashTypes = {'activeIndex': "ID",'class': "STRING"};
  options = {hash:{
    'activeIndex': ("activeTab"),
    'class': ("col-md-9")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['carousel-component'] || depth0['carousel-component']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "carousel-component", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n        <div class=\"col-md-3 col-xs-12 pull-right sidebar text-center\">\n            <a class=\"btn btn-primary btn-large live-support-button top-buffer bottom-buffer\">Live Support</a>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});