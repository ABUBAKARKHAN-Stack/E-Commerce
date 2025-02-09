import jwt from 'jsonwebtoken'

export function generateToken(payload: Record<string, unknown>, expiry: string): string {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT SECRET is not defined')
    }
    if (!expiry) {
        throw new Error('JWT EXPIRY is not defined')
    }

    const token = jwt.sign(payload, secret, {
        expiresIn: expiry as jwt.SignOptions["expiresIn"]
    })
    return token
}