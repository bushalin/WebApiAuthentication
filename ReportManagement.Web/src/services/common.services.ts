import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfileEdit } from 'src/models/user';

@Injectable()
export class CommonService {
  header
  constructor(private http: HttpClient) {
    this.header = new HttpHeaders()
    .set('Content-type', 'application/json');
    this.header.set('Accept', 'application/json');
  }

    // Common Request Urls
  // Get List
  // Url: http://127.0.0.1:3000/company/

  // Fetch all employee data
  getAllUsers() {
    return this.http.get<any>(environment.apiUrl + `user/getallUserInfo`).pipe(
      map(res => {
        return res;
      })
    );
  }

  //fetching REPORT data
  getReports() {
    return this.http.get<any>(environment.apiUrl + `user/getallUserInfo`).pipe(
      map(res => {
        return res;
      })
    );
  }


  getList(url) {
    return this.http.get<any>(environment.apiUrl + url).pipe(
      map(res => {
        return res;
      })
    );
  }

  // httpOptions Will be added for authentication put

  // Add List
  // Url: http://127.0.0.1:3000/company/
  /*{
    "name":  "Company Name",
    "email":  "Company@email.com",
    "tel":  "0000252525"
  }*/

  createList(url, params) {
    return this.http.post<any>(environment.apiUrl + url, params).pipe(
      map(res => {
        return res;
      })
    );
  }

  // Update List (PUT Method)
  // Url: http://127.0.0.1:3000/company/1
  /*{
    "name":  "Company Name",
    "email":  "Company@email.com",
    "tel":  "0000252525"
  }*/

  updateList(url, params) {
    return this.http.put<any>(url, params).pipe(
      map(res => {
        return res;
      })
    );
  }

  // Delete List (Patch Method)
  // Url: http://127.0.0.1:3000/company/1

  deleteList(url) {
    return this.http.delete<any>(url).pipe(
      map(res => {
        return res;
      })
    );
  }

  getCountryList(lang) {
    return this.http
      .get<any>(environment.apiUrl + `Country/GetCountryList/` + lang)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getPrefectureList(lang) {
    return this.http
      .get<any>(environment.apiUrl + `Prefecture/GetPrefectureList/` + lang)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getCurrenctyList(lang) {
    return this.http
      .get<any>(environment.apiUrl + `Currency/GetCurrencyList/` + lang)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getIndustryClassificationList(lang) {
    return this.http
      .get<any>(environment.apiUrl + `IndustryClassification/GetIndustryClassificationList/` + lang)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getCountryAreaList(lang) {
    return this.http
    .get<any>(environment.apiUrl + `CountryArea/GetCountryAreaList/` + lang)
    .pipe(
      map(res=> {
        return res;
      })
    );
  }

  getJobCategoryList(lang) {
    return this.http
    .get<any>(environment.apiUrl + `JobCategory/GetJobCategoryList/` + lang)
    .pipe(
      map(res=> {
        return res;
      })
    );
  }

  getJobCategoryDetailListById(id, lang) {
    return this.http
    .get<any>(environment.apiUrl + `JobCategory/GetJobCategoryDetailsById/` + id + `/` + lang)
    .pipe(
      map(res=> {
        return res;
      })
    );
  }
  getLanguageList(lang) {
    return this.http
    .get<any>(environment.apiUrl + `Language/GetLanguageList/` + lang)
    .pipe(
      map(res=> {
        return res;
      })
    );
  }
  getLanguageLevelList(lang) {
    return this.http
    .get<any>(environment.apiUrl + `Language/GetLanguageLevelList/` + lang)
    .pipe(
      map(res=> {
        return res;
      })
    );
  }

  getNationalityList(lang) {
    return this.http
    .get<any>(environment.apiUrl + `Nationality/GetNationalityList/` + lang)
    .pipe(
      map(res=> {
        return res;
      })
    );
  }
  getOtherCareerList(lang) {
    return this.http
    .get<any>(environment.apiUrl + `OtherCareer/GetOtherCareerList/` + lang)
    .pipe(
      map(res=> {
        return res;
      })
    );
  }

  getTranslationQuotation(param, lang) {
    return this.http
    .get<any>(environment.apiUrl + `OptionEstimateService/getTranslationQuotation/` + param + `/` + lang)
    .pipe(
      map(res=> {
        return res;
      })
    );
  }

  onClickMailServiceCheckQuotationResult(id) {
    return this.http
    .get<any>(environment.apiUrl + `OptionEstimateService/GetMailServiceCostById/` + id)
    .pipe(
      map(res=> {
        return res;
      })
    );
  }

  SaveServiceOrder(ServiceOrderObject:any) {
    return this.http
      .post<any>(environment.apiUrl + `ServiceOrder/SaveServiceOrder`, JSON.stringify({ServiceOrderObject}), { headers: this.header })
      .pipe(
        map(res => {
          return res;
        })
      );
  }


  SaveJobPosting(jobPosting:any) {
    return this.http
      .post<any>(environment.apiUrl + `JobPost/SaveJobPost`, JSON.stringify({jobPosting}), { headers: this.header })
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  
  getCityByPrefectureID (id, lang) {
    return this.http
    .get<any>(environment.apiUrl + `City/GetCityByPrefectureId/` + id + `/` + lang)
    .pipe(
      map(res=> {
        return res;
      })
    );
  }

  //skills Registrations

  getStaffStrongSkillList (lang) {
    return this.http
    .get<any>(environment.apiUrl + `Common/GetStaffStrongSkillList/` + lang)
    .pipe(
      map(res=> {
        return res;
      })
    );
  }

  getUserInfoById(id) {
    return this.http.get<any>(environment.apiUrl + `user/GetUserDetailById/` + id)
    .pipe(
      map(res => {
        return res;
      })
    );
  }

  updateProfile(userProfile) {
    return this.http.put<UserProfileEdit>(environment.apiUrl + `user/UpdateUserProfile`, userProfile, {headers: this.header})
    .pipe(
      map(res => {
        return res;
      })
    )
  }

}
