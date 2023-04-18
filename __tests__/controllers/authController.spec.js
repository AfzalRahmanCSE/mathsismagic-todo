const User = require('./../../models/users')
const bcrypt = require('bcrypt')
const { getJwtToken } = require('./../../utils/helpers')
const { getAllUsers, registerUser,loginUser } = require('../../controllers/authController')
const { errorResponse } = require('../../utils/errorResponse')
const catchAsync=require('./../../utils/catchAsync')

jest.mock('./../../utils/catchAsync')
jest.mock('../../utils/errorResponse')
jest.mock('./../../utils/helpers', () => ({
    getJwtToken: jest.fn(() => 'Fake Jwt Token')
}))

const mockRequest = () => {
    return {
        body: {
            name: 'test user',
            email: 'test@gmail.com',
            password: '12345678'
        }
    }
}

const mockResponse = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
}

const mockNext = jest.fn()

const mockUser = {
    name: 'test user',
    email: "test1@gmail.com",
    password: 'hashedPassword',
    _id: '623456a45545647'

}
beforeAll(() => {
    jest.clearAllMocks()
})

describe('get list of  all users', () => {
    it('Should get list of all users', async () => {
        jest.spyOn(User, 'find').mockResolvedValueOnce([mockUser])
        const mockReq = mockRequest().body = { body: {} }
        // console.log('get', mockReq)
        const mockRes = mockResponse()

        await getAllUsers(mockReq, mockRes, mockNext)

        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.json).toHaveBeenCalledWith([mockUser])
    })
})

describe('Signup user all test cases', () => {
    describe('Checks All Validations', () => {
        it('Should check whether all fields are present or not', async () => {
            const mockReq = mockRequest().body = { body: {} }
            console.log("mock111", mockReq)
            const mockRes = mockResponse()
            // console.log("mock112",mockRes)

            await registerUser(mockReq, mockRes, mockNext)
            //  expect(mockRes.status).toHaveBeenCalledWith(400)
            expect(mockNext).toHaveBeenCalledTimes(1)
            expect(errorResponse).toHaveBeenCalledWith('All Fields Mandatory', 400)
        })
        it('Should check whether user already exists or not', async () => {
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(true)
            const mockReq = mockRequest()
            const mockRes = mockResponse()


            await registerUser(mockReq, mockRes, mockNext)

            expect(mockNext).toHaveBeenCalledTimes(1)
            expect(errorResponse).toHaveBeenCalledWith(
                'User Already Exist', 400
            )


        })
    })
    describe('Create User Successful', () => {
        it('Should create user Successfully', async () => {
            const mockReq = mockRequest()
            const mockRes = mockResponse()

            jest.spyOn(User, 'findOne').mockResolvedValueOnce(false)
            jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedPassword')

            jest.spyOn(User, 'create').mockResolvedValueOnce(mockUser)

            await registerUser(mockReq, mockRes, mockNext)

            expect(mockRes.status).toHaveBeenCalledWith(201)
            expect(mockRes.json).toHaveBeenCalledWith('Fake Jwt Token')
        })
    })
})
const mockRequest1=()=>{
    return{
        body:{
            'email':'test@gmail.com',
            'password':'12345678'
        }
    }
}

describe('Login user all test cases',()=>{
   describe('All Validation cases',()=>{
    it('Should check for all fields',async ()=>{
        const mockReq=mockRequest1().body={body:{}}
        const mockRes=mockResponse()

        await loginUser(mockReq,mockRes,mockNext)

        expect(mockNext).toHaveBeenCalledTimes(1)
        expect(errorResponse).toHaveBeenCalledWith(
            'All fields Mandatory',400)
    })
    it('Should check for existence of user',async ()=>{
        const mockReq=mockRequest1()
        const mockRes=mockResponse()

        jest.spyOn(User,'findOne').mockImplementationOnce(()=>({
        select:jest.fn().mockResolvedValueOnce(null)
        }))

        await loginUser(mockReq,mockRes,mockNext)

        expect(mockNext).toHaveBeenCalledTimes(1)
        expect(errorResponse).toHaveBeenCalledWith('User doesnt exist',400)        


    })
    it('Should check for password validity',async ()=>{
        const mockReq=mockRequest1()
        const mockRes=mockResponse()
        jest.spyOn(User,'findOne').mockImplementationOnce(()=>({
            select:jest.fn().mockResolvedValueOnce(mockUser)
        }))
        jest.spyOn(bcrypt,'compare').mockResolvedValueOnce(false)

        await loginUser(mockReq,mockRes,mockNext)

        expect(mockNext).toHaveBeenCalledTimes(1)
        expect(errorResponse).toHaveBeenCalledWith(
            'Invalid Email or password',400
        )


    })

   })
   describe('Logs user in successfully',()=>{
    it('should logs the user successfully',async ()=>{
        const mockReq=mockRequest1()
        const mockRes=mockResponse()

        jest.spyOn(User,'findOne').mockImplementationOnce(()=>({
            select:jest.fn().mockResolvedValueOnce(mockUser)
        }))
        jest.spyOn(bcrypt,'compare').mockResolvedValueOnce(true)

        await loginUser(mockReq,mockRes,mockNext)

        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.json).toHaveBeenCalledWith({token:'Fake Jwt Token'})

    })
   }) 
})