import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [LoginComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('email and password should be a string', () => {
    const email = component.emailInput;
    const password = component.passwordInput;
    const type = 'string'
    expect(typeof email).toEqual(type);
    expect(typeof password).toEqual(type);
  });


  it('function validateEmail should validate email', async () => {
    let trueEmail = await component.validateEmail('honey44@live.com');
    expect(trueEmail).toEqual(true)
  })

  it('function validateEmail should not validate email', async () => {
    let wrongEmail = await component.validateEmail('helloFriend');
    expect(wrongEmail).toEqual(false)
  })

  it('function validatePassword should validate password', async () => {
    let truePass = await component.validatePassword('acceptablePassword');
    expect(truePass).toEqual(true)
  })

  it('function validatePassword should not validate password', async () => {
    let wrongPass = await component.validatePassword('123');
    expect(wrongPass).toEqual(false)
  })

  it('function enterAccount should not log in', async () => {
    let wrongEmailOrPass = await component.enterAccount('emailNotInDataBase', 'passlNotInDataBase');
    expect(wrongEmailOrPass).toEqual("Email or password is wrong")
  })

  it('function setDivResponse should return a string', async () => {
    let divResponse = await component.setDivResponse('Password is too short');
    expect(typeof divResponse).toEqual('string')
  })

  it('function giveRegisterResponse should give correct response', async () => {
    let registerResponse = await component.giveRegisterResponse(200);
    expect(registerResponse).toEqual('Registered succesfully')
  })

  it('function giveRegisterResponse should give correct response', async () => {
    let registerResponse = await component.giveRegisterResponse(400);
    expect(registerResponse).toEqual('Please provide email and password to register')
  })

  it('function giveRegisterResponse should give correct response', async () => {
    let registerResponse = await component.giveRegisterResponse(500);
    expect(registerResponse).toEqual('Name already used by another user')
  })

  it('function giveRegisterResponse should give correct response', async () => {
    let registerResponse = await component.giveRegisterResponse(332);
    expect(registerResponse).toEqual('Server error')
  })

  it('function giveEnterResponse should give correct response', async () => {
    let enterResponse = await component.giveEnterResponse(400);
    expect(enterResponse).toEqual('Email or password is wrong')
  })

  it('function giveEnterResponse should give correct response', async () => {
    let enterResponse = await component.giveEnterResponse(666);
    expect(enterResponse).toEqual('Something is wrong, try again later')
  })

});


