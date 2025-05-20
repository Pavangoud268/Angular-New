import { inject } from "@angular/core"
import { AuthService } from "./src/app/Services/auth.service"
import { ActivatedRoute, ActivatedRouteSnapshot, Router,RouterStateSnapshot,UrlTree } from "@angular/router"
import { ActivityServiceService } from "./src/app/Services/activity-service.service"

export const CanActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{
  const authService = inject(AuthService)
  const activeRoute = inject(ActivatedRoute)
  const router = inject(Router)

  if(authService.IsAuthenticated()){
    return true
  }else{
    authService.redirectPath = state.url
    console.log(router.url)
    router.navigate(['Login'])
    return false
  }
}
export const resolve = ()=>{
  let activiteService = inject(ActivityServiceService)
  return activiteService.getActivites()
}
