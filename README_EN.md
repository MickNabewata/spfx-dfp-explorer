# spfx-cds-explorer

[日本語](https://github.com/MickNabewata/spfx-dfp-explorer/blob/master/README.md)

## Summary

A tool for testing API execution against Common Data Service.   
It also contains some sample requests.

![Capture](https://github.com/MickNabewata/spfx-dfp-explorer/blob/images/en/1.png)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.11-green.svg)

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

## How to install

1. Clone this repository
1. Ensure that you are at the solution folder
1. in the command-line run:
  - **npm install**
  - **npm run package**
1. Go to the Azure management portal and select Azure Active Directory> App Registration Screen> All Applications tab, then SharePoint Online Client Extensibility Web Application Principal.   
1. Add Dynamics CRM> user_impersonation on the API permissions screen.
1. Upload spfx-cds-explorer.sppkg to SharePoint app catalog.(The sppkg file will be created in the {SharePoint} folder when you execute the command **npm run package**)   
1. Add {spfx-cds-explorer} to your sharepoint site.   
1. Add {Common Data Service Explorer} to your site page.

## Features

- Executing Common Data Service Web API

You can input method, environtment, endpoint URL, headers, body to test the API.

![Capture](https://github.com/MickNabewata/spfx-dfp-explorer/blob/images/en/1.png)

- Sample requests

Select a sample request and run it quickly.

![Capture](https://github.com/MickNabewata/spfx-dfp-explorer/blob/images/en/2.png)

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**