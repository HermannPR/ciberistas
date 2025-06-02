"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_query_1 = require("@tanstack/react-query");
var react_router_dom_1 = require("react-router-dom");
var toaster_1 = require("@/components/ui/toaster");
var tooltip_1 = require("@/components/ui/tooltip");
var Index_1 = require("@/pages/Index");
var NotFound_1 = require("@/pages/NotFound");
var Sonner_1 = require("@/components/Sonner");
/***********************
 *  NEW APP LAYOUT – inspired by  *
 *  https://codeclub.org          *
 ***********************************/
var queryClient = new react_query_1.QueryClient();
var App = function () { return (<react_query_1.QueryClientProvider client={queryClient}>
    <tooltip_1.TooltipProvider>
      <toaster_1.Toaster />
      <Sonner_1.default />
      <react_router_dom_1.BrowserRouter>
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/" element={<Index_1.default />}/>
          <react_router_dom_1.Route path="*" element={<NotFound_1.default />}/>
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </tooltip_1.TooltipProvider>
  </react_query_1.QueryClientProvider>); };
exports.default = App;
